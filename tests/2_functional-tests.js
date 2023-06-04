const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
    this.timeout(5000);
    test("Convert a valid input such as 10L: GET request to /api/convert.", (done) => {
        chai
            .request(server)
            .keepOpen()
            .get("/api/convert?input=10L")
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, {
                    initNum: 10,
                    initUnit: "L",
                    returnNum: 2.64172,
                    returnUnit: "gal",
                    string: "10 liters converts to 2.64172 gallons",
                });
                done();
            });
    });

    test("Convert an invalid input such as 32g: GET request to /api/convert.", (done) => {
        chai
            .request(server)
            .keepOpen()
            .get("/api/convert?input=32g")
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.strictEqual(res.text, "invalid unit");
                done();
            });
    });

    test("Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.", (done) => {
        chai
            .request(server)
            .keepOpen()
            .get("/api/convert?input=3/7.2/4kg")
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.strictEqual(res.text, "invalid number");
                done();
            });
    });

    test("Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.", (done) => {
        chai
            .request(server)
            .keepOpen()
            .get("/api/convert?input=3/7.2/4kilomegagram")
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.strictEqual(res.text, "invalid number and unit");
                done();
            });
    });

    test('Convert miles to kilometers and vice versa', function(done) {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '1mi' })
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.isObject(res.body); // Assert that the response body is an object
                assert.property(res.body, 'initNum');
                assert.property(res.body, 'initUnit');
                assert.property(res.body, 'returnNum');
                assert.property(res.body, 'returnUnit');
                assert.property(res.body, 'string');
                done();
            });
    });


    test("Convert with no number such as kg: GET request to /api/convert.", (done) => {
        chai
            .request(server)
            .keepOpen()
            .get("/api/convert?input=kg")
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, {
                    initNum: 1,
                    initUnit: "kg",
                    returnNum: 2.20462,
                    returnUnit: "lbs",
                    string: "1 kilograms converts to 2.20462 pounds",
                });
                done();
            });
    });
});

