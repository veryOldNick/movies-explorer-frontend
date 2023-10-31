 function checkResponse(res) {
	if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
}

export default checkResponse;
