package warehouse;

import . "rosalind/model/product";

type Warehouse struct {
  id string;
  products []Product;
}

func (wh *Warehouse) GetProductQuantity() int {
  return len(wh.products);
}

func (wh *Warehouse) RemoveProduct(id string) {
  for i, product := range wh.products {
    if (product.ID == id) {
      // wh.products[:i] slice from start to i (except i)
      // wh.products[i+1:]... slice from i + 1 to end
      // ignore i in between
      wh.products = append(wh.products[:i], wh.products[i+1:]...);
      return;
    }
  }
}