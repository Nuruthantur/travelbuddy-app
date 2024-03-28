async function getBase64(file: File) {
  const result = new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      reject(error);
      console.log("Error: ", error);
    };
  });
  return result;
}
export default getBase64;
