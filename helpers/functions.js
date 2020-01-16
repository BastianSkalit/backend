exports.formatRupiah = angka => {
  var reverse = angka
      .toString()
      .split("")
      .reverse()
      .join(""),
    ribuan = reverse.match(/\d{1,3}/g);
  ribuan = ribuan
    .join(".")
    .split("")
    .reverse()
    .join("");
  return "Rp." + ribuan + ",-";
};

const formatRupiah = angka => {
  var reverse = angka
      .toString()
      .split("")
      .reverse()
      .join(""),
    ribuan = reverse.match(/\d{1,3}/g);
  ribuan = ribuan
    .join(".")
    .split("")
    .reverse()
    .join("");
  return "Rp." + ribuan + ",-";
};

exports.Products = data => {
  const Product = data.map(item => {
    let items = {
      id: item.id,
      name: item.name,
      image: item.image,
      category: {
        id: item.category.id,
        name: item.category.name
      },
      description: item.description,
      price: formatRupiah(item.price),
      createdBy: {
        id: item.user.id,
        fullname: item.user.fullname,
        image: item.user.image,
        email: item.user.email,
        phone: item.user.phone
      }
    };
    return items;
  });
  return Product;
};

exports.newPayments = data => {
  const newPayment = data.map(item => {
    let newItem = {
      id: item.id,
      product: {
        id: item.product.id,
        name: item.product.product,
        image: item.product.image,
        category: {
          id: item.product.category.id,
          name: item.product.category.name
        },
        description: item.product.description,
        price: formatRupiah(item.product.price),
        createdBy: {
          id: item.product.user.id,
          fullname: item.product.user.fullname,
          image: item.product.user.image,
          email: item.product.user.email,
          phone: item.product.user.phone
        }
      },
      buyer: {
        id: item.buyer.id,
        name: item.buyer.name
      },
      quantity: item.quantity,
      totalPrice: formatRupiah(item.totalPrice),
      status: item.status,
      attachment: item.attachment
    };
    return newItem;
  });
  return newPayment;
};

exports.newFavorites = data => {
  const newFavorite = data.map(item => {
    let newItems = {
      id: item.product.id,
      name: item.product.name,
      image: item.product.image,
      category: {
        id: item.product.category.id,
        name: item.product.category.name
      },
      description: item.product.description,
      price: formatRupiah(item.product.price),
      createdBy: {
        id: item.product.user.id,
        fullname: item.product.user.fullname,
        image: item.product.user.image,
        email: item.product.user.email,
        phone: item.product.user.phone
      }
    };
    return newItems;
  });
  return newFavorite;
};
