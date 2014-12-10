var marketoSign = require('..');
var assert = require('assert');

describe('marketo-sign', function(){
  it('should have matching signature', function () {
    var encryptionKey = '04815162342048151623420481516234204815162342';
    var timestamp = new Date('2010-04-09T14:04:54Z');
    var userId = 'bigcorp1_4815162342';

    var expectedSignature = '70cef71be7b01d597cca081bb4098001e1e5ca3c';
    var signature = marketoSign(userId, encryptionKey, timestamp);
    assert.equal(signature, expectedSignature);
  });

  it('should hash emails properly', function () {
    var key = '04815162342048151623420481516234204815162342';
    var email = 'calvin@segment.io';

    var signature = marketoSign.email(key, email);
    assert.equal(signature, '2b10f792b8fa3e0b45018195fb2ba39f21350c76');
  });
});