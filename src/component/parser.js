let data ={
  'image_att': '[0.0065, 0.0036, 0.003, 0.0032, 0.0036, 0.0041, 0.0051, 0.0082, 0.0073, 0.0066, 0.007, 0.0062, 0.0064, 0.0055, 0.0028, 0.003, 0.0065, 0.0031, 0.0037, 0.0034, 0.0037, 0.0033, 0.0038, 0.0029, 0.0037, 0.0043, 0.0034, 0.0036, 0.004, 0.0032, 0.0032, 0.0026, 0.0036, 0.0031, 0.0036, 0.0026, 0.0029, 0.0033, 0.0029, 0.0036, 0.0039, 0.0029, 0.0024, 0.0032, 0.0036, 0.0024, 0.0064, 0.0033, 0.0036, 0.0034, 0.0036, 0.0034, 0.0039, 0.0037, 0.0029, 0.0029, 0.0031, 0.0037, 0.0029, 0.0029, 0.0033, 0.0036, 0.0065, 0.005, 0.0039, 0.0036, 0.0036, 0.0065, 0.0058, 0.0072, 0.0024, 0.0034, 0.0029, 0.003, 0.0029, 0.0037, 0.0043, 0.0031, 0.0039, 0.0036, 0.003, 0.0028, 0.0036, 0.0031, 0.0078, 0.0054, 0.003, 0.0043, 0.0028, 0.0034, 0.0036, 0.0038, 0.0043, 0.0038, 0.0038, 0.0039, 0.0034, 0.0032, 0.0035, 0.003, 0.0031, 0.0079, 0.0039, 0.0043, 0.0058, 0.0039, 0.0038, 0.003, 0.0034, 0.0039, 0.0031, 0.0032, 0.0027, 0.0046, 0.0047, 0.0048, 0.0033, 0.008, 0.0047, 0.0056, 0.0029, 0.0039, 0.003, 0.0029, 0.0032, 0.0033, 0.0029, 0.0037, 0.0034, 0.0054, 0.0067, 0.0042, 0.0036, 0.0033, 0.0039, 0.003, 0.0077, 0.0028, 0.003, 0.0029, 0.0028, 0.0028, 0.0026, 0.0031, 0.0037, 0.0038, 0.0038, 0.0034, 0.0038, 0.0027, 0.0081, 0.0126, 0.0098, 0.0044, 0.0029, 0.0031, 0.0028, 0.0027, 0.0027, 0.0035, 0.0054, 0.0029, 0.0032, 0.0034, 0.0035, 0.0028, 0.0087, 0.0088, 0.0071, 0.0028, 0.0031, 0.0028, 0.0029, 0.0027, 0.0028, 0.0037, 0.0055, 0.0029, 0.0035, 0.0028, 0.0029, 0.005, 0.009, 0.0087, 0.0065, 0.004, 0.003, 0.0029, 0.0027, 0.0028, 0.0029, 0.0036, 0.0055, 0.0031, 0.0029, 0.0032, 0.0028, 0.0026, 0.0068, 0.0042, 0.0041, 0.0032, 0.0031, 0.0029, 0.0032, 0.0051, 0.0043, 0.0035, 0.0056, 0.0029, 0.0037, 0.0031, 0.0028, 0.0037, 0.0036, 0.0039, 0.0033, 0.0028, 0.004, 0.0031, 0.0032, 0.0035, 0.0027, 0.0035, 0.0058, 0.0031, 0.0029, 0.003, 0.0031, 0.003, 0.0036, 0.0041, 0.0034, 0.0029, 0.0029, 0.0029, 0.0029, 0.0028, 0.003, 0.0029, 0.005, 0.0038, 0.0035, 0.0036, 0.0035, 0.003, 0.0028, 0.0025, 0.0032, 0.0037, 0.0039, 0.0029, 0.0032, 0.0028, 0.0054, 0.0026]', 
  'image_att2': 'nan', 
  'pdi_answer_att2': 'nan', 
  'pdi_att_token': '[0.0041, 0.1413, 0.1548, 0.1367, 0.1348]', 
  'grid_num': '256', 
  'gt': 'no_stress', 
  'prediction': 'no_stress', 
  'tokenized': "['이', '사람','##은', '야구', '##를', '하고', '있어요']", 
  'tokenized_att': "[0.0041, 0.1413, 0.0233, 0.1548, 0.1367, 0.1348]"};

  var tokenized = data['tokenized']
  tokenized = tokenized.slice(1,tokenized.length-1).replace(/\'/g,'').split(', ');
  console.log(JSON.stringify(tokenized));
  data['tokenized'] = JSON.stringify(tokenized);

  let tokenAtt = data['tokenized_att'];
  console.log(tokenAtt.slice(1,tokenAtt.length-1).split(', '));
  data['tokenized_att'] = tokenAtt;

  console.log(JSON.parse(JSON.stringify(data)));

  /**
   * var tokenized = item['tokenized']
    tokenized = tokenized.slice(1,tokenized.length-1).replace(/\'/g,'').split(', ');
    console.log(tokenized);
    item['tokenized'] = tokenized;

    let tokenAtt = item['tokenized_att'];
    console.log(tokenAtt.slice(1,tokenAtt.length-1).split(', '));
    item['tokenized_att'] = tokenAtt;
    toSet.push(JSON.parse(JSON.stringify(item)));
   */