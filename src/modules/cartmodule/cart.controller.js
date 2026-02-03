import cart from '../../../DB/models/cart.models.js';
import meal from '../../../DB/models/meals.model.js';
export const getcart=async(req,res)=>{
    try {
        const user_id=req.user.id
        const cartitem=await cart.find({user_id}).populate('meal_id','name price category image isAvailable').sort({ createdAt: -1 });
        if(!cartitem || cartitem.length===0){
            return res.status(200).json({ message: 'Cart is empty', 
                cart: [],
                total: 0 })
            }
                
                const cartwithtotals=cartitem.map(item=>({_id:item.id,
                    meal:{id:item.meal_id._id,
                        name:item.meal_id.name,
                        price: item.meal_id.price,
                        category: item.meal_id.category,
                        image: item.meal_id.image,
                        isAvailable: item.meal_id.isAvailable
                    },
                    quantity: item.quantity,
                    size: item.size,
                    notes: item.notes,
                    price_per_unit: item.price_snapshot,
                    subtotal: item.price_snapshot * item.quantity
                }))
        
    } catch (error) {
        
    }
}