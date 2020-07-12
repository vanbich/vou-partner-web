// import userConstants from "../constants";

const initState = {
  games: [
    {
      id: 1,
      name: "Tâng bóng",
      point: 20,
      logo: "/images/products/product_1.png",
      description:
        "Tâng bóng và giữ khi bóng rơi xuống liên tục nếu không giữ được sẽ kết thúc màn chơi"
    },
    {
      id: 2,
      name: "Lật ảnh",
      point: 6,
      logo: "/images/products/product_2.png",
      description:
        "Tìm những cặp ảnh giống nhau với số lượt mở ảnh cho trước nếu hết lượt mở ảnh mà chưa mở hết thì thua"
    },
    {
      id: 3,
      name: "Tìm mảnh ghép",
      point: 5,
      logo: "/images/products/product_3.png",
      description:
        "Tìm ảnh cho trước có trong bức tranh được hiển thị trên màn hình trong khoảng thời gian cho trước, hết thời gian thì kết thúc màn chơi"
    }
  ]
};

const Games = (state = initState, action) => {
  return { ...state };
};

export default Games;
