elementValueById = function (id) {
  var element = document.getElementById(id);

  return !element ? null : element.value;
};

trimmedElementValueById = function (id) {
  var result = elementValueById(id);

  return (null !== result) ? result.trim() : result;
};