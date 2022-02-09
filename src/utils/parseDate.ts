export const parseDate = (created_at: string) => {
  const date = new Date(created_at);

  const dateToReturn = `${date.getMonth().toString().length < 2 ? 0 : ""}${
    date.getMonth() + 1
  }/${
    date.getDate().toString().length < 2 ? 0 : ""
  }${date.getDate()}/${date.getFullYear()}`;

  return dateToReturn;
};
