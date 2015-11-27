
//require the relevant third modules
var program = require('commander');
var sqlite3 = require('sqlite3').verbose();
var colors = require('colors');

//create a database named rainboat
var db = new sqlite3.Database('windows');
db.serialize(function(){
	db.run('CREATE TABLE IF NOT EXISTS  category (name Text)');
	db.run('CREATE TABLE IF NOT EXISTS item (content Text,name Text)');
});


function queryCategoryTable(){

	db.serialize(function(){
	//query the categories
	console.log(colors.blue('Index    Category'));
	db.each("SELECT rowid AS id,name FROM category",function(err,row){
		console.log(colors.green(row.id+'         '+row.name));
		});
	});

}

function queryItemTable(){

	db.serialize(function(){
	
	//query the items
	db.each("SELECT rowid AS id,name FROM category",function(err,row){
		var name = row.name
		console.log(colors.yellow('  %s  '),name);
		console.log('');
		console.log(colors.blue('Index'+'     '+'Command'));
		db.each('SELECT rowid AS id,content FROM item',function(err,row){
			console.log(colors.cyan(' '+row.id + '        '+row.content));
		});
	});

});

}

 function removeCategory(which){
 	db.serialize(function(){
 		

 		process.stdin.once('data',function(data){
			var dataInt = parseInt(data); 
			if(dataInt == 1){
				db.each("SELECT name FROM category where rowid = ?",which,function(err,row){
					db.serialize(function(){
 					db.run('DELETE FROM item where name = ?',row.name);

 					});

				});
				db.run('DELETE FROM category where rowid = ?',which);
					 			}
 			process.stdin.pause();
 		});
 		console.log('if you remove the category ,items in category will be remove too.type 1 to remove,other cancel')
 		process.stdin.resume();
 		

 	});
 }

 function removeItem(which){

 	db.serialize(function(){
 		db.run('DELETE FROM item where rowid = ?',which);

 	});

 }

 function addCategory(name){

 	db.serialize(function(){

 		db.run('INSERT INTO category (name) values (?)',name);

 	});

 }

 function addItem(mode,content){
 	db.serialize(function(){
 	db.each('SELECT name FROM category where rowid = ?',mode,function(err,row){
 		db.run('INSERT INTO item (name,content) values (?,?)',row.name,content);
 	  });
 	});

 }





//specify the version of package
program
	.version('1.0.0');

program
	.command('list')//list commands
	.alias('l')//alias is l
	.description('list the commands stored in the computer')
	.option('-c,--category','specifying this means listing categories')
	.action(function(options){
		if(options.category){
			queryCategoryTable();
		}else{
			queryItemTable();
		}
	});
	

program
	.command('add <content>') //content is required that is added content
	.alias('a')
	.description('add content you want')
	.option('-t,--type <mode>','which category to add to',parseInt,0)
	.option('-c,--category','specifying this means add category')
	.action(function(content,options){
		if(options.category){
		addCategory(content);
    	}else{
    	addItem(options.type,content)
    	}
    });

 program
 	.command('remove <which>')//which stands for the index of item or category you want to remove
 	.alias('r')
 	.description('remove the category or item you want to remove')
 	.option('-c,--category','specifying this means remove category')
 	.action(function(which,options){

 		if(options.category){
 			removeCategory(which);
 		}else{
 			removeItem(which);
 		}

    });


program.on('--help',function(){
	console.log('Detailed Usages ');
	console.log(colors.blue('list|l [-c]  ')+colors.red('"-c specifies list categories"'));
	console.log(colors.blue('add|a [-t|-c] <content> ')+colors.red('"-t specifies which category,-c  decides category or item"'));
	console.log(colors.blue('remove|r [-c] <which>'+colors.red('"-c decides remove catory or item"')));
	console.log('');
	console.log('Examples:');
	console.log(colors.blue('$remem list'));
	console.log(colors.blue('$remem list -c'));
	console.log(colors.blue('$remem add "Linux" -c'));
	console.log(colors.blue('$remem add "rm -r directory(remove a directory)" -t 1'));
	console.log(colors.blue('$remem remove -c 1'));
	console.log(colors.blue('$remem remove 1'));
});


program.parse(process.argv);





