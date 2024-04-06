export async function postData(
  url,
  data,
  successActions = () => {},
  errorActions = () => {}
) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Connection: "keep-alive",
        Accept: "*/*",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    successActions();
    return json;
  } catch (error) {
    errorActions();
  }
}
