var marketoSign = require('..')
  , should      = require('should');


describe('Marketo Authentication Header', function () {

  it('should have matching signature', function () {

    var userId        = 'bigcorp1_4815162342'
      , encryptionKey = '04815162342048151623420481516234204815162342'
      , timestamp     = new Date('2010-04-09T14:04:54-07:00');

    var expectedSignature = '406b82d92b250d7010fac6872973ca69e3009703';

    var signature = marketoSign(userId, encryptionKey, timestamp);
    signature.should.equal(expectedSignature);
  });


  it('should hash emails properly', function () {

    var email         = 'calvin@segment.io'
      , encryptionKey = '04815162342048151623420481516234204815162342';

    var signature = marketoSign.email(encryptionKey, email);
    signature.should.equal('2b10f792b8fa3e0b45018195fb2ba39f21350c76');
  });

});