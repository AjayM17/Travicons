import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) { }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  async addCartItem(cartItem: any) {
    let cart: any[] = await this.getCartItem()
    if (cart == null) {
      cart = []
    }
    const excursionIndex = cart.findIndex(item => item['excursion_id'] == cartItem['excursion_id'])
    if (excursionIndex == -1) {
      cart.push(cartItem)
      await this._storage?.set('cart', cart)
    } else {
      alert('Item already exists in the cart')
    }


  }
  async getCartItem() {
    return await this._storage?.get('cart')
  }

  async deleteCartItem(excursion_id: string) {
    let cart: any[] = await this.getCartItem()
    if (cart != null) {
      const excursionIndex = cart.findIndex(item => item['excursion_id'] == excursion_id)
      if (excursionIndex != -1) {
        cart.splice(excursionIndex, 1)
        await this._storage?.set('cart', cart)
      }
    } else {
      cart = []
    }
    return cart
  }
  
}
