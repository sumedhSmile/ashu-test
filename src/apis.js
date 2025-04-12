import axios from "axios";

const baseUrl =
  "https://90lzb0z3hl.execute-api.ap-southeast-2.amazonaws.com/version_1";
export const loginHandler = async ({ email, password }) => {
  try {
    const res = await axios.post(baseUrl + "/login", {
      email: email,
      password: password,
    });
    if (res.data.message === "Login successful") {
      localStorage.setItem(
        "userdetails",
        JSON.stringify({ username: res.data.user_name, email })
      );
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const registerHandler = async ({ username, email, password }) => {
  try {
    const res = await axios.post(baseUrl + "/register", {
      user_name: username,
      email: email,
      password: password,
    });
    if (res.data.message === "Registration successful") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const getSubscriptionHandler = async ({ email }) => {
  try {
    const res = await axios.get(baseUrl + "/get_subscriptions", {
      params: { email: email },
    });

    if (res.data && res.data.subscriptions) {
      return res.data.subscriptions;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addSubscriptionHandler = async ({
  username,
  title,
  artist,
  album,
  img_url,
}) => {
  try {
    const res = await axios.post(baseUrl + "/version_1/add_subscription", {
      username: username,
      title: title,
      artist: artist,
      album: album,
      img_url: img_url,
    });

    if (res.data && res.data.message === "Subscription added successfully") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
