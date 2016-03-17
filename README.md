#remem

[项目地址](https://www.npmjs.com/package/remem)

```$npm install remem  -g```

This is the node package that helps you record some commands of Shell!

####Features:

* List categories and items stored by yourself!
* Add categories and items of commands you want to store!
* Remove categories and items you think are useless!

####Usage:

######1.``list`` or ``l``

* `$remem list` //this command will list items of commands
* `$remem list -c` //this command will list categories of comannds


######2.``add`` or ``a``

* `$remem add 'Linux' -c`//this command will add a category named 'Linux'
*  `$remem add 'rm -r directoryName(delete a directory)' -t 2'` this command will add the item whose content is 'rm -r directoryName(delete a directory)' to the category whose id is 2


######3.``remove`` or ``r``

* `$remem remove 2 -c` //this command will remove the category whose id is 2;take care: items contained by the category will be removed too.
* `$remem remove 2` //this command will remove the item whose id is 2



###Example

* ![one](https://github.com/WflytoC/remem/raw/master/images/one.png)
* ![two](https://github.com/WflytoC/remem/raw/master/images/two.png)





If you run across some issues ,please contanct me! I'm pretty  happy that you can improve this package.














