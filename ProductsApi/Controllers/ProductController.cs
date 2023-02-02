using ProductsApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProductsApi.Controllers
{
    public class ProductController : ApiController
    {
        Entities db = new Entities();

        //Add product Post
        public string Post(Product product)
        {
            db.Products.Add(product);
            db.SaveChanges();
            return "Item added sucessfully";
        }
        //Get all products from table
        public IEnumerable<Product> GetAll()
        {
            return db.Products.ToList();
        }

        //Get product by Id
        public Product GetById(int id)
        {
            return db.Products.Find(id);
        }

        //Update the product
        public string Put(int id, Product product)
        {
            var oproduct = db.Products.Find(id);
            if (oproduct != null)
            {
                oproduct.Name = product.Name;
                oproduct.Price = product.Price;
                oproduct.Quantity = product.Quantity;
                oproduct.Active = product.Active;

                db.Entry(oproduct).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
            return "Item has been updated sucessfully";
        }

        //delete product
        public string Delete(int id)
        {
            Product product = db.Products.Find(id);
            if (product != null)
            {
                db.Products.Remove(product);
                db.SaveChanges();
            }
            return "Item deleted sucessfully";
        }
    }
}
