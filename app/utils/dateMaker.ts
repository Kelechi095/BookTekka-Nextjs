export const getDate = (createdAt:any) => {
    const date = new Date(createdAt);
    return (
      date.getDate() +
      " " +
      date.toLocaleString("default", { month: "long" }) +
      " " +
      date.getFullYear()
    );
  };
  