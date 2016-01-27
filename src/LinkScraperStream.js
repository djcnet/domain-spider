/**
 * Created by davidclarke on 18/01/2016.
 */

import stream from 'stream';
import cheerio from 'cheerio';
import url from 'url';

class LinkScraperStream extends stream.Transform {

    constructor(host) {
        super();
        this.html = '';
        this.total = 0;
        this.host = host;
    }

    _transform(chunk, encoding, cb) {
        this.html += chunk.toString();
        cb();
    }

    end() {
        var $ = cheerio.load(this.html);
        this.emit('count', $('a').length);
        this.emit('end', $('a').map((i, el) => {

            var link = $(el).attr('href');
            try {
                var page = url.parse(link);
                if (page.hostname !== null) {
                    return link;
                }

                this.total++;
                this.push('http://' + this.host + link);
            } catch (e) {
                this.emit('error', 'Could not parse url for value: ' + link);
            }

        }).get());
    }
}

export default LinkScraperStream;