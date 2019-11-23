import axios from "axios";
export const SIGNIN = payload => {
  return { type: "SIGNIN", payload };
};

export const VERIFY_TOKEN = token => {
  return dipatch => {
    axios
      .get("/auth/verifytoken", { headers: { authorization: token } })
      .then(({ data }) => {
        dipatch({ type: "VERIFY_TOKEN", payload: data });
      })
      .catch(err => {});
  };
};
