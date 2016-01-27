/**
 * Created by davidclarke on 18/01/2016.
 */

import stream from 'stream';
import url from 'url';
import _ from 'lodash';

class DomainStream extends stream.Transform {

    constructor(suffixes) {
        super();

        if (!Array.isArray(suffixes) || suffixes.length === 0) {
            throw new ReferenceError('An array of suffixes are required');
        }

        this.suffixes = suffixes;
    }

    extractDomain(link) {
        let domain = null,
            tld = null,
            domainParts = [];

        link = url.parse(link);

        if (link.host !== null) {
            domainParts = link.host.split('.');

            switch(domainParts.length) {
                case 2:
                    tld = domainParts[1];
                    domain = domainParts[0] + '.' + tld;
                    break;

                case 3:
                    tld = domainParts[2];
                    domain = domainParts[1] + '.' + tld;
                    break;

                case 4:
                    tld = domainParts[2] + '.' + domainParts[3];
                    domain = domainParts[1] + '.' + domainParts[2] + '.' + domainParts[3];
                    break;
            }
        }

        return {domain: domain, tld:tld};
    }

    _transform(chunk, encoding, processed) {
        let host = this.extractDomain(chunk.toString());
        if (host.domain !== null && this.suffixes.indexOf(host.tld) !== -1) {
            this.push(host.domain);
        }

        processed();
    }
}

export default DomainStream;