let agent = require('superagent-promise')(require('superagent'), Promise);

export const createApiFactory = ({
  url = '',
  method = 'POST',
  type = "json",
  params = {}
}) => {
    if(method == "GET"){
      return agent(method, url)
              .query(params)
              .end()
              .then(function onResult(res) {
                  return res.body || JSON.parse(res.text)
              }, function onError(err) {
                  throw new Error(err)
              });
    }

    // 返回 fetch 请求（Promise），在调用 API 时可直接使用 .then 进行后续处理
    return agent(method, url)
            .type(type)
            .send(params)
            .end()
            .then(function onResult(res) {
                return res.body || JSON.parse(res.text)
            }, function onError(err) {
                console.log(err)
                throw new Error(err)
            });
}

export const createFormApiFactory = (path, params, method) => {
  method = method || "post"; // Set method to post by default if not specified.

  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for(var key in params) {
    if(params.hasOwnProperty(key)) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}