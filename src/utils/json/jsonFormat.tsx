const jsonFormat = (code: string) => {
  try {
    return JSON.stringify(JSON.parse(code));
  } catch (error) {
    console.error(error);
    return code;
  }
};

export default jsonFormat;
