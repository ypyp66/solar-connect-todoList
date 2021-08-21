export const dateValid = (dateString) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();

  const [finishY, finishM, finishD] = dateString.split("-");

  if (finishY < year) {
    return false;
  } else {
    if (finishM < month) {
      return false;
    } else {
      if (finishD < date) {
        return false;
      }
    }
  }
  return true;
};
