const detailNewData = (data) => {
  const newData = data.map((obj) => {
    const { qty, price } = obj;

    return {
      ...obj,
      amt: qty * price, // 小計
    };
  });

  return newData;
};

export { detailNewData };
