package product;

type Product struct {
  ID string;
  Weight float32;
  X, Y, Z float32;
}

func (product *Product) SetWeight(weight float32) {
  product.Weight = weight;
}

func (product *Product) GetVolume() float32 {
  return product.X * product.Y * product.Z;
}