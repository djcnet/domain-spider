/**
 * Created by davidclarke on 18/01/2016.
 */

import http from 'http';
import LinkScraperStream from 'src/LinkScraperStream';
import DomainStream from 'src/DomainStream';

let domains = ['www.bbc.co.uk'];

domains.forEach( (domain) => {

    let linkStream = new LinkScraperStream(domain),
        ukDomainStream = new DomainStream(['co.uk', 'org.uk', 'uk', 'me.uk']);

    http.get({host: domain, path: '/'}, function(response) {
        response
            .pipe(linkStream)
            .pipe(ukDomainStream)
            .pipe(process.stdout);
    });

    linkStream.on('error', function(error) {
        //console.log(error);
    });

    linkStream.on('count', function(count) {
        //console.log('Total links found: ' + count);
    });

    linkStream.on('end', function(links) {
        //console.log(links);
    });
});