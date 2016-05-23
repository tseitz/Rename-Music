/******** TO-DO's

*********/

const fs = require('fs'),
      //currDir = '/Users/tseitz10/Google Drive/TransferMusic/';
      currDir = 'F:\\GoogleDrive\\TransferMusic\\';

var artist, channel, title, originalFileName, finalFileName;

fs.readdir(currDir, (e, files) => {
    files.forEach((fileName, index) => {
        originalFileName = `${currDir}${fileName}`;
        fileName = removeBadCharacters(fileName);
        fileName = checkExclusives(fileName);
        artist = grabArtist(fileName);
        fileName = removeRemix(fileName);
        channel = grabChannel(fileName);
        title = grabTitle(fileName);

        // piece it together and rename
        finalFileName = `${currDir}${artist} - ${channel} - ${title}.mp3`;

        //console.log(`${artist} - ${channel} - ${title}`);
        console.log('-----------------------');
        //console.log(originalFileName);
        console.log(finalFileName);

        // Rename file
        fs.rename(originalFileName, finalFileName);
    });
});

function removeBadCharacters(fileName) {
    var upperName = fileName.toUpperCase();

    fileName = fileName.replace('\u2122', '');  // TM
    fileName = fileName.replace('\u3010', '['); // 【
    fileName = fileName.replace('\u3011', '] '); // 】
    fileName = fileName.replace('\u2768', '['); // ❨
    fileName = fileName.replace('\u2769', ']'); // ❩
    fileName = fileName.replace('\u2770', '['); // ❰
    fileName = fileName.replace('\u2771', ']'); // ❱

    // Channels
    upperName.includes('[FIRE') ? fileName = fileName.substring(0, upperName.indexOf('[FIRE') - 1).concat('.mp3') : fileName;
    upperName.includes('NEVER SAY DIE - BLACK LABEL') ? fileName = fileName.replace('Never Say Die - Black Label', 'Never Say Die Black Label') : fileName;

    fileName = fileName.replace(/ _ DIM MAK RECORDS/i, '');
    fileName = fileName.replace(/ I DIM MAK RECORDS/i, '');
    fileName = fileName.replace(/ L DIM MAK RECORDS/i, '');
    fileName = fileName.replace(/ \[CHILL TRAP EXCLUSIVE\]/i, '');
    fileName = fileName.replace(/ \[DARIUS TRAP\]/i, '');
    fileName = fileName.replace(/ \[DTB FREE RELEASE\]/i, '');
    fileName = fileName.replace(/ \[GOOD ENUFF RELEASE\]/i, '');
    fileName = fileName.replace(/ \[MAJESTIC COLOR\]/i, '');
    fileName = fileName.replace(/ \[MONSTERCAT FREE RELEASE\]/i, '');
    fileName = fileName.replace(/ \[NCS RELEASE\]/i, '');
    fileName = fileName.replace(/ \[OTODAYO RECORDS\]/i, '');
    fileName = fileName.replace(/ \[POXIMITY RELEASE\]/i, '');
    fileName = fileName.replace(/ \[ROTTUN OFFICIAL STREAM\]/i, '');

    // Genres
    fileName = fileName.replace(/ \[BASS\]/i, '');
    fileName = fileName.replace(/ \[BASS HOUSE\]/i, '');
    fileName = fileName.replace(/ \[DNB\]/i, '');
    fileName = fileName.replace(/ \[DRUM&BASS\]/i, '');
    fileName = fileName.replace(/ \[DRUM & BASS\]/i, '');
    fileName = fileName.replace(/ \[DRUM AND BASS\]/i, '');
    fileName = fileName.replace(/ \[DRUMSTEP\]/i, '');
    fileName = fileName.replace(/ \[DUBSTEP\]/i, '');
    fileName = fileName.replace(/ \[EDM\]/i, '');
    fileName = fileName.replace(/ \[ELECTRO\]/i, '');
    fileName = fileName.replace(/ \[ELECTRONICA\]/i, '');
    fileName = fileName.replace(/ \[FREAKSTEP\]/i, '');
    fileName = fileName.replace(/ \[FUTURE\]/i, '');
    fileName = fileName.replace(/ \[FUTURE BASS\]/i, '');
    fileName = fileName.replace(/ \[GLITCH HOP\]/i, '');
    fileName = fileName.replace(/ \[HARD DANCE\]/i, '');
    fileName = fileName.replace(/ \[HARDSTYLE TRAP\]/i, '');
    fileName = fileName.replace(/ \[HIP HOP\]/i, '');
    fileName = fileName.replace(/ \[HOUSE\]/i, '');
    fileName = fileName.replace(/ \[HYBRID\]/i, '');
    fileName = fileName.replace(/ \[JUNGLE TERROR\]/i, '');
    fileName = fileName.replace(/ \[MELODIC DUBSTEP\]/i, '');
    fileName = fileName.replace(/ \[NEURO TRAP\]/i, '');
    fileName = fileName.replace(/ \[TRAP\]/i, '');
    fileName = fileName.replace(/ \[TRAPSTEP\]/i, '');

    // Tags
    fileName = fileName.replace(/ \(1440P\)/i, '');
    fileName = fileName.replace(/ \(AUDIO\)/i, '');
    fileName = fileName.replace(/ \[ 360 VISUALIZER \]/i, '');
    fileName = fileName.replace(/ \[360 VR VIDEO\]/i, '');
    fileName = fileName.replace(/ \(EXCLUSIVE\)/i, '');
    fileName = fileName.replace(/ \[EXCLUSIVE PREMEIRE\]/i, '');
    fileName = fileName.replace(/ \(EXTENDED MIX\)/i, '');
    fileName = fileName.replace(/ \[FREE\]/i, '');
    fileName = fileName.replace(/ \(FREE DL\)/i, '');
    fileName = fileName.replace(/ \[FREE DL\]/i, '');
    fileName = fileName.replace(/ \[FREE DOWNLOAD\]/i, '');
    fileName = fileName.replace(/ \(FREE DOWNLOAD\)/i, '');
    fileName = fileName.replace(/ \[HD\]/i, '');
    fileName = fileName.replace(/ \[HD & FREE DL\]/i, '');
    fileName = fileName.replace(/ \[HD & FREE\]/i, '');
    fileName = fileName.replace(/ \[OFFICIAL\]/i, '');
    fileName = fileName.replace(/ \(OFFICIAL\)/i, '');
    fileName = fileName.replace(/ \(OFFICIAL AUDIO\)/i, '');
    fileName = fileName.replace(/ \{OFFICIAL FULL STREAM\}/i, '');
    fileName = fileName.replace(/ \(OFFICIAL FULL STREAM\)/i, '');
    fileName = fileName.replace(/ \[OFFICIAL FULL STREAM\]/i, '');
    fileName = fileName.replace(/ \[OFFICIAL STREAM\]/i, '');
    fileName = fileName.replace(/ \(OFFICIAL STREAM\)/i, '');
    fileName = fileName.replace(/ \(OFFICIAL VIDEO\)/i, '');
    fileName = fileName.replace(/ \(LYRIC VIDEO\)/i, '');
    fileName = fileName.replace(/ \(OFFICIAL LYRIC VIDEO\)/i, '');
    fileName = fileName.replace(/ \(OFFICIAL MUSIC VIDEO\)/i, '');
    fileName = fileName.replace(/ \[OFFICIAL MUSIC VIDEO\]/i, '');
    fileName = fileName.replace(/ \[OFFICIAL UPLOAD\]/i, '');
    fileName = fileName.replace(/ \(ORIGINAL MIX\)/i, '');
    fileName = fileName.replace(/ \[ORIGINAL MIX\]/i, '');
    fileName = fileName.replace(/ \(OUT NOW\)/i, '');
    fileName = fileName.replace(/ \[OUT NOW\]/i, '');
    fileName = fileName.replace(/ \[OUT NOW!\]/i, '');
    fileName = fileName.replace(/ \[PREMIERE\]/i, '');
    fileName = fileName.replace(/ \(RADIO EDIT\)/i, '');

    return fileName;
}

function checkExclusives(fileName) {
    if (fileName.toUpperCase().includes('EXCLUSIVE]')) {
        fileName = fileName.substring(0, fileName.indexOf('[') - 1).concat('.mp3');
    }

    return fileName;
}

function grabArtist(fileName) {
    var artist,
        upperName = fileName.toUpperCase();

    if (upperName.endsWith('REMIX).MP3')) {
        artist = fileName.slice(upperName.lastIndexOf('(') + 1, upperName.lastIndexOf('REMIX') - 1);
    } else if (upperName.endsWith('REMIX].MP3')) {
        artist = fileName.slice(upperName.lastIndexOf('[') + 1, upperName.lastIndexOf('REMIX') - 1);
    } else if (upperName.endsWith('FLIP).MP3')) {
        artist = fileName.slice(upperName.lastIndexOf('(') + 1, upperName.lastIndexOf('FLIP') - 1);
    } else if (upperName.endsWith('EDIT).MP3')) {
        artist = fileName.slice(upperName.lastIndexOf('(') + 1, upperName.lastIndexOf('EDIT)') - 1);
    } else if (upperName.endsWith('MOOMBAHTON REMIX).MP3')) {
        artist = fileName.slice(upperName.lastIndexOf('(') + 1, upperName.lastIndexOf('MOOM') - 1);
    } else if (upperName.endsWith('COVER).MP3')) {
        artist = fileName.slice(upperName.lastIndexOf('(') + 1, upperName.lastIndexOf('COVER') - 1);
    } else if (upperName.endsWith('BOOTLEG).MP3')) {
        artist = fileName.slice(upperName.lastIndexOf('(') + 1, upperName.lastIndexOf('BOOTLEG') - 1);
    } else if (upperName.endsWith('CLUB MIX).MP3')) {
        artist = fileName.slice(upperName.lastIndexOf('(') + 1, upperName.lastIndexOf('CLUB MIX)') - 1);
    } else if (upperName.endsWith('EDITION).MP3')) {
        artist = fileName.slice(upperName.lastIndexOf('(') + 1, upperName.lastIndexOf('EDITION)') - 1);
    } else {
        artist = fileName.slice(fileName.indexOf('-') + 1, fileName.lastIndexOf('-') - 1);
    }

    if (artist.trim() === 'Topic' && !fileName.includes('Various Artists')) {
        artist = grabChannel(fileName);
    }

    return artist.trim();
}

function removeRemix(fileName) {
    var upperName = fileName.toUpperCase();

    if (upperName.endsWith('REMIX).MP3')) {
        fileName = fileName.slice(0, upperName.lastIndexOf('(') - 1).concat('.mp3');
    } else if (upperName.endsWith('REMIX].MP3')) {
        fileName = fileName.slice(0, upperName.lastIndexOf('[') - 1).concat('.mp3');
    } else if (upperName.endsWith('FLIP).MP3')) {
        fileName = fileName.slice(0, upperName.lastIndexOf('(') - 1).concat('.mp3');
    } else if (upperName.endsWith('EDIT).MP3')) {
        fileName = fileName.slice(0, upperName.lastIndexOf('(') - 1).concat('.mp3');
    } else if (upperName.endsWith('MOOMBAHTON REMIX).MP3')) {
        fileName = fileName.slice(0, upperName.lastIndexOf('(') - 1).concat('.mp3');
    } else if (upperName.endsWith('COVER).MP3')) {
        fileName = fileName.slice(0, upperName.lastIndexOf('(') - 1).concat('.mp3');
    } else if (upperName.endsWith('BOOTLEG).MP3')) {
        fileName = fileName.slice(0, upperName.lastIndexOf('(') - 1).concat('.mp3');
    } else if (upperName.endsWith('CLUB MIX).MP3')) {
        fileName = fileName.slice(0, upperName.lastIndexOf('(') - 1).concat('.mp3');
    } else if (upperName.endsWith('EDITION).MP3')) {
        fileName = fileName.slice(0, upperName.lastIndexOf('(') - 1).concat('.mp3');
    }

    return fileName;
}

function grabChannel(fileName) {
    var channel;

    channel = fileName.slice(0, fileName.indexOf('-') - 1);

    return channel.trim();
}

function grabTitle(fileName) {
    var title;

    title = fileName.slice(fileName.lastIndexOf('-') + 1, fileName.indexOf('.mp3'));

    return title.trim();
}