/**
 * Created by davidclarke on 21/01/2016.
 */
import DomainStream from 'src/DomainStream';

describe('DomainStream', function() {

    describe('constructor', function() {
        it('should construct with a given array of suffixes', function() {
            let sut = new DomainStream(['com', 'net']);
            expect(sut instanceof DomainStream).toEqual(true);
        });

        it('should throw a reference error if no parameter is passed', function() {
            expect(function() {
                new DomainStream();
            }).toThrowError();
        });

        it('should throw a reference error if null is passed', function() {
            expect(function() {
                new DomainStream(null);
            }).toThrowError();
        });

        it('should throw a reference error if an empty array is passed', function() {
            expect(function() {
                new DomainStream([]);
            }).toThrowError();
        });

        it('should throw a reference error if anything other than an array is passed', function() {
            expect(function() { new DomainStream('foo'); }).toThrowError();
            expect(function() { new DomainStream({}); }).toThrowError();
            expect(function() { new DomainStream(123456); }).toThrowError();
        });
    });

    describe('extractDomain method', function() {
        it('should return the root domain from a given link', function() {
            let sut = new DomainStream(['co.uk']);
            expect(sut.extractDomain('http://www.bbc.co.uk/').domain).toEqual('bbc.co.uk');
            expect(sut.extractDomain('http://www.bbc.co.uk/foo/bar').domain).toEqual('bbc.co.uk');
            expect(sut.extractDomain('/foo/bar').domain).toEqual(null);
            expect(sut.extractDomain('https://test.test.com').domain).toEqual('test.com');
        });
    });
});