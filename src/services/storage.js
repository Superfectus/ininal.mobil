import * as storage from '@react-native-async-storage/async-storage';

export async function setWellcomeShowed() {
  await storage.useAsyncStorage("wellcomeShowed").setItem("true");
}

export async function getAuthAsyncStorage() {
  const wellcomeShowed = await storage.useAsyncStorage("wellcomeShowed").getItem();
  const token = await storage.useAsyncStorage("userToken").getItem();

  return {
    token,
    showWellcome: !(wellcomeShowed === "true")
  };
}

export async function setAuthAsyncStorage(response) {
  await storage.useAsyncStorage("userToken").setItem(response.data.token);
}

export async function resetAuthAsyncStorage() {
    await storage.useAsyncStorage('userToken').removeItem();
}

export async function removeStorage() {
    storage.default.removeItem("wellcomeShowed");
    storage.default.removeItem("userToken");
}


