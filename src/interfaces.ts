interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: "food" | "cleaning";
  expirationDate: Date;
}

type ICleningProduct = Omit<IProduct, "id" | "expirationDate">;

interface IFoodProduct extends ICleningProduct {
  calories: number;
}


export { IProduct, ICleningProduct, IFoodProduct };
