var getServers = exports.getServers = function(req, res){
  console.log('API requested'.yellow);
  
  var serverListObject = [{"ip": "192.168.11.125", "port": "2040", "tag": "HEAD"}, {"ip": "192.168.11.126", "port": "2055", "tag": "xbrl_validations_adjustments_2013-12-13"} ];
  
  res.end(JSON.stringify(serverListObject));
};