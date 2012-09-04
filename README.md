# Qoppa

The main idea of Qoppa is simple:

Use integrated intellect of all your site readers (i.e. native intellect) to
eliminate text mistakes and typos.

Imagine that a user reads any text and suddenly stumbles on a typo
(sometimes we say "his eye gets stuck"). What does this user feel? Something
annoying. Many users even begin to click an errorous word with mouse mechanically
and immediately remove the selection - they try to get rid of an annoying feeling!
And here the Orphus begins its act: user may just select a typo with mouse and
press Shift+Q; after that an information immediately (in the background!)
is sent to a webmaster of your site, i.e. to you.

## Instructions

Create banner or textual informer with `id="koppa"` and text like this

    Select spelling error with your mouse and press Shift+Q

MySQL table structure:

    CREATE TABLE IF NOT EXISTS `koppa` (
    `u` tinyint(1) unsigned NOT NULL DEFAULT '0',
    `date` date NOT NULL DEFAULT '0000-00-00',
    `hour` tinyint(2) unsigned NOT NULL DEFAULT '0',
    `ip` varchar(16) NOT NULL,
    PRIMARY KEY (`date`,`hour`,`ip`),
    KEY `koppa_u` (`u`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

jQuery & Qoppa

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
    <script src="koppa.js" type="text/javascript"></script>
