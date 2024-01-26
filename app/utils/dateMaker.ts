export const getDate = (createdAt) => {
    const date = new Date(createdAt);
    return (
      date.getDate() +
      " " +
      date.toLocaleString("default", { month: "long" }) +
      " " +
      date.getFullYear()
    );
  };
  