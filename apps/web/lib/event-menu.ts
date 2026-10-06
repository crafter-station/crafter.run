/* Don Salazar's menu for the Hot Reload meetup. Each attendee picks one drink
   and one food item; the event covers up to `maxTotal` soles per person. Items
   that cannot pair with anything under that cap are left out. */

export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  category: string
}

export const eventMenu = {
  slug: "hot-reload-1",
  edition: "1",
  venue: "Don Salazar Specialty Coffee",
  targetTotal: 30,
  maxTotal: 32,
} as const

export const drinks: MenuItem[] = [
  { id: "espresso", name: "Espresso", description: "Un shot de sabor intenso.", price: 8, category: "Calientes" },
  { id: "espresso-doble", name: "Espresso doble", description: "Doble shot intenso.", price: 11, category: "Calientes" },
  { id: "americano", name: "Americano", description: "Espresso y agua caliente.", price: 11, category: "Calientes" },
  { id: "macchiato", name: "Macchiato", description: "Espresso con un toque de espuma.", price: 11, category: "Calientes" },
  { id: "cortado", name: "Cortado", description: "Espresso con un toque de leche.", price: 11, category: "Calientes" },
  { id: "cappuccino", name: "Cappuccino", description: "Espresso, leche y espuma densa.", price: 13, category: "Calientes" },
  { id: "latte", name: "Latte", description: "Espresso suave con mucha leche.", price: 13, category: "Calientes" },
  { id: "flat-white", name: "Flat white", description: "Espresso y microespuma suave.", price: 14, category: "Calientes" },
  { id: "stumpy", name: "Stumpy", description: "Espresso con poca microespuma, concentrado.", price: 14, category: "Calientes" },
  { id: "mocaccino", name: "Mocaccino", description: "Espresso, leche y chocolate.", price: 15, category: "Calientes" },
  { id: "white-cappuccino", name: "White cappuccino", description: "Cappuccino con vainilla.", price: 16, category: "Calientes" },
  { id: "pink-cappuccino", name: "Pink cappuccino", description: "Cappuccino con fresa.", price: 16, category: "Calientes" },
  { id: "black-cappuccino", name: "Black cappuccino", description: "La especialidad de la casa.", price: 18, category: "Calientes" },
  { id: "ceremonia", name: "Ceremonia del café", description: "Café de finca por V60, Origami, Chemex, Aeropress o Press2Go.", price: 20, category: "Calientes" },
  { id: "americano-frio", name: "Americano frío", description: "Americano con hielo.", price: 12, category: "Fríos" },
  { id: "orange-coffee", name: "Orange coffee", description: "Jugo de naranja con doble cold drip.", price: 16, category: "Fríos" },
  { id: "iced-cappuccino", name: "Iced cappuccino", description: "Espresso, leche y hielo.", price: 17, category: "Fríos" },
  { id: "cold-drip", name: "Cold drip", description: "Filtrado en frío por 8 horas.", price: 17, category: "Fríos" },
  { id: "frappe-don-salazar", name: "Frappe Don Salazar", description: "Un frappe de especialidad.", price: 17, category: "Fríos" },
  { id: "sparkling-clasico", name: "Sparkling coffee clásico", description: "Limón, café y ginger ale.", price: 17, category: "Fríos" },
  { id: "iced-white-cappuccino", name: "Iced white cappuccino", description: "Con vainilla y hielo.", price: 18, category: "Fríos" },
  { id: "iced-pink-cappuccino", name: "Iced pink cappuccino", description: "Con fresa y hielo.", price: 18, category: "Fríos" },
  { id: "frappe-oreo", name: "Frappe de Oreo", description: "Frappe de Oreo de especialidad.", price: 18, category: "Fríos" },
  { id: "sparkling-maracumango", name: "Sparkling maracumango", description: "Maracuyá, mango, limón, café y ginger ale.", price: 19, category: "Fríos" },
  { id: "iced-black-cappuccino", name: "Iced black cappuccino", description: "La especialidad, en frío.", price: 20, category: "Fríos" },
  { id: "sparkling-dragon", name: "Sparkling dragon coffee", description: "Frutos rojos, limón, café y ginger ale.", price: 20, category: "Fríos" },
  { id: "jugo-naranja", name: "Jugo de naranja", description: "Naranja exprimida al momento.", price: 12, category: "Sin café" },
  { id: "alivio", name: "Alivio Don Salazar", description: "Infusión de hierbas digestiva.", price: 12, category: "Sin café" },
  { id: "amor-jamaica", name: "Amor de Jamaica", description: "Infusión caliente de flor de jamaica.", price: 12, category: "Sin café" },
  { id: "evian-gas", name: "Agua Evian con gas", description: "330 ml.", price: 13, category: "Sin café" },
  { id: "evian", name: "Agua Evian sin gas", description: "500 ml.", price: 13, category: "Sin café" },
  { id: "chocolate", name: "Chocolate caliente", description: "Chocolate derretido y leche.", price: 15, category: "Sin café" },
  { id: "orange-fizz", name: "Orange fizz", description: "Burbujeante de naranja.", price: 15, category: "Sin café" },
  { id: "tropical-fizz", name: "Tropical fizz", description: "Burbujeante de frutas tropicales.", price: 15, category: "Sin café" },
  { id: "cerveza", name: "Cerveza Sol de la Finca", description: "Artesanal de la casa.", price: 25, category: "Sin café" },
]

export const foods: MenuItem[] = [
  { id: "galletas", name: "Galletas chocochip", description: "Grande y suave.", price: 7, category: "Dulces" },
  { id: "brownie", name: "Brownie", description: "Con fudge casero.", price: 9, category: "Dulces" },
  { id: "queque", name: "Queque artesanal", description: "Sabor según disponibilidad.", price: 12, category: "Dulces" },
  { id: "muffin-chocolate", name: "Muffin triple chocolate", description: "Cacao intenso.", price: 12, category: "Dulces" },
  { id: "muffin-queso", name: "Muffin de queso y arándanos", description: "Queso crema y arándanos.", price: 12, category: "Dulces" },
  { id: "galleton-nutella", name: "Galletón de Nutella", description: "Relleno de Nutella.", price: 12, category: "Dulces" },
  { id: "torta-chocolate", name: "Torta de chocolate", description: "Simplemente deliciosa.", price: 18, category: "Dulces" },
  { id: "affogato", name: "Affogato Don Salazar", description: "Helado de vainilla con espresso.", price: 18, category: "Dulces" },
  { id: "cheesecake-maracumango", name: "Cheesecake maracumango", description: "Maracuyá, mango y coco.", price: 18, category: "Dulces" },
  { id: "cheesecake-frutos-rojos", name: "Cheesecake frutos rojos", description: "Frutos rojos frescos.", price: 18, category: "Dulces" },
  { id: "carrot-cake", name: "Carrot cake", description: "Magnífico.", price: 19, category: "Dulces" },
  { id: "waffles", name: "Waffles de la finca", description: "Arándanos, fresa y miel.", price: 24, category: "Dulces" },
  { id: "empanada-carne", name: "Empanada de carne prime", description: "Carne jugosa de res.", price: 12, category: "Salados" },
  { id: "empanada-bechamel", name: "Empanada bechamel", description: "Pollo, champiñones y bechamel.", price: 12, category: "Salados" },
  { id: "empanada-napolitana", name: "Empanada napolitana", description: "Tomate, mozzarella, jamón y albahaca.", price: 12, category: "Salados" },
  { id: "empanada-cheeseburger", name: "Empanada cheese burger", description: "Carne y queso estilo hamburguesa.", price: 14, category: "Salados" },
  { id: "sandwich-pollo", name: "Sándwich de pollo", description: "Pollo con mayonesa casera.", price: 15, category: "Salados" },
  { id: "croissant-mixto", name: "Croissant mixto", description: "Jamón y queso cajamarquino.", price: 17, category: "Salados" },
  { id: "mini-churros", name: "5 mini churros", description: "Rellenos de queso y jamón.", price: 18, category: "Salados" },
  { id: "croissant-pollo", name: "Croissant de pollo", description: "Pollo con mayonesa casera.", price: 20, category: "Salados" },
  { id: "toston", name: "Tostón con palta y pollo", description: "Pan campesino, palta y pollo.", price: 24, category: "Salados" },
  { id: "focaccia-capresse", name: "Focaccia capresse", description: "Tomate, mozzarella y albahaca.", price: 24, category: "Salados" },
]

export function findDrink(id: string) {
  return drinks.find((item) => item.id === id)
}

export function findFood(id: string) {
  return foods.find((item) => item.id === id)
}

export function fitsBudget(drink: MenuItem, food: MenuItem) {
  return drink.price + food.price <= eventMenu.maxTotal
}
