let express=require('express'),
  router=express.Router();
// router.get('/', (req, res) => {
//   console.log(`no implementado`);
//   res.send('no implementado');
// });

router.get('/', function(req, res){
  res.status(200).json('hello world');
});
module.exports = router;


