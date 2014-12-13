
# marketo-sign

  A set of utilities to sign marketo requests

## marketoSign(userId, encryptionKey, [timestamp])

  Sign a userId and encryptionKey for a particular timestamp in the format marketo expects

```javascript
var userId        = 'bigcorp1_4815162342'
  , encryptionKey = '04815162342048151623420481516234204815162342'
  , timestamp     = new Date('2010-04-09T14:04:54-07:00');

var signature = marketoSign(userId, encryptionKey, timestamp);
console.log(signature); // '406b82d92b250d7010fac6872973ca69e3009703'
```

## .email(key, email)

  Sign a marketo user's email using the encryption key or API private key so that Munchkin can make secure Marketo calls

```javascript
var email         = 'calvin@segment.io'
  , key = '04815162342048151623420481516234204815162342';

var signature = marketoSign.email(key, email);
console.log(signature); // '2b10f792b8fa3e0b45018195fb2ba39f21350c76'
```

## .header(userId, encryptionKey, [timestamp])

  Convenience method to create a soap header for marketo requests in the form:

```xml
<env:Header>
  <ns1:AuthenticationHeader>
    <mktowsUserId>{{ userId }}</mktowsUserId>
    <requestSignature>{{ signature }}</requestSignature>
    <requestTimestamp>{{ timestamp }}</requestTimestamp>
  </ns1:AuthenticationHeader>
</end:Header>
```

## License

(The MIT License)

Copyright (c) 2013 Segment.io &lt;friends@segment.io&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.