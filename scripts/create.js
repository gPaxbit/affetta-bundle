'use strict'

var fs = require('fs');
var shell = require('shelljs');
var c = require('chalk');
var _available_type = ['pug', 'styl', 'js'];
const nl = process.platform === 'win32' ? '\r\n' : '\n';

let $add = (f, t) => {
	let _fullpath = f.split('/').slice(0,-1).join('/');
	let _f = f.split('/').splice(-1,1)[0]

	let promise = new Promise((res, rej) => {
		res(shell.mkdir('-p', './dev/'+t+'/'+_fullpath));
	})

	promise.then((e) => {
		fs.appendFile('./dev/'+t+'/'+_fullpath+'/'+_f+'.'+t, '', function(err) {
		  if (err) throw console.log(err);
		  if(t == 'styl') {
		  	fs.appendFileSync('./dev/styl/main.styl', `${nl}`+'@import "'+_fullpath+'/'+_f+'"');
		  }
		  console.log('Файл '+_f+'.'+t+' добавлен в dev/'+t+'/'+_fullpath);
		});
	})
}

if (process.argv.slice(2).length < 2) {
	console.log(c.bgRed('Не задан тип или название файла'));
} else if (process.argv.slice(2).length > 2) {
	console.log(c.bgRed.underline('- Неверный формат команды, используйте: ') +
		nl +
		c.bold.cyan('-- npm run file <тип файла> <[директория/]имя файла>'))


} else {

	let _args = process.argv.slice(2);
	let _type = _args[0]
	let _file = _args[1]

	if(!_available_type.includes(_type)) {
		console.log(c.bgRed('- Неверный тип файла.') +
			nl +
			c.bgRed('-- Возможные типы ') + 
			nl +
			c.bold.cyan('--', _available_type))
	} else {

		if(_file.split('/').length < 2) {
			fs.appendFile('./dev/'+_type+'/'+_file+'.'+_type, 'include partitials/head'+nl+'	', {'flags': 'w+'}, function(err) {
			  if (err) throw console.log(err);
			  if(_type == 'styl') {
			  	fs.appendFileSync('./dev/styl/main.styl', `${nl}`+'@import "'+_file+'"');
			  }
			  if (_type == 'pug') {
			  	fs.appendFileSync('./dev/pug/start.pug', `${nl}`+'		li: a(href="'+_file+'.'+_type+'" target="_blank") '+_file);
			  }
			  console.log('Файл '+_file+'.'+_type+' добавлен в dev/'+_type);
			});
		} else {
			switch (_type) {
				case 'styl':
					$add(_file, _type);
					break;
				case 'pug':
					$add(_file, _type);
					break;
				case 'js':
					$add(_file, _type);
					break;
			}
		}

	}

}