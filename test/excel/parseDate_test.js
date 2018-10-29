require('chai').should();
const util=require('../../src/utils/excel/parseDate');
describe('parseDate', async() => {
  const expectedDate='12/17/1996';
  describe('.parseDate()', async function(){
    it('deberia convertir de string MM/DD/YY a Date()', async function()  {

      let result=util.parseDate(expectedDate);
      result.getDate().should.equal(17);
      result.getMonth().should.equal(12-1); //Enero= mes 0
      result.getFullYear().should.equal(1996);
    });
  });
  describe('getMesAño', function()  {
    it('deberia ', async function() {
      let date=util.parseDate(expectedDate);
      let result=util.getMesAno(date);
      console.log(result);
    });
  });
});
