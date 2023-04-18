
import Shipment from '../../../models/shipment.js';
import ShippingMethod from '../../../models/shipping_method.js';

const shipmentMutations = {
	incShipmentItems: async ( shipment, boxCount, cbf, fbe ) => {
		return Shipment.findOne (
			{   shipSH: shipment.shipSH, 
				shippingDate: shipment.shippingDate,
			},
		).then( res => {
			if ( res !== null ) {
				return Shipment.findByIdAndUpdate ( res._id, 
					{
						$inc: {
							itemCount: boxCount,
							CBF: cbf,
							FBE: fbe,
							totalPrice: ( boxCount * res.boxCharge ) + ( res.pricePerCBF * cbf * res.fuelCharge )
						}

					}
				);
			}

			return ShippingMethod.findOne({ shortHand: { $eq: shipment.shipSH } })
				.then( res => {
					let newShipment = {
						shipSH: res.shortHand,
						shippingDate: shipment.shippingDate,
						arrivalDate:  shipment.arrivalDate,
						itemCount: boxCount,
						FBE: fbe,
						CBF: cbf,
						boxCharge: res.boxCharge,
						pricePerCBF: res.pricePerCBF,
						fuelCharge: res.fuelCharge,
						totalPrice: ( boxCount * res.boxCharge ) + ( res.pricePerCBF * cbf * res.fuelCharge )
					};
					return new Shipment ( newShipment ).save();
				});
		});
	}
};

export default shipmentMutations;