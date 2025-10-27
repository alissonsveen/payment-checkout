import { Product } from "@/types/product"
import Headphone from "@/assets/headphones.png"
import keyboardM from "@/assets/keyboard-mechanical.png"
import mouseG from "@/assets/mouse-gamer.png"
import charger from "@/assets/charger.png"
import controll from "@/assets/controll.png"
import webcam from "@/assets/webcam.png"
import mousePad from "@/assets/mousepad.png"
import micUSB from "@/assets/studiomic.png"

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Fone Bluetooth",
    description: "Fone sem fio com cancelamento de ruído",
    image: Headphone,
    price: 299.9,
  },
  {
    id: "p2",
    name: "Teclado Mecânico",
    description: "Switches táteis e iluminação RGB",
    image: keyboardM,
    price: 459.0,
  },
  {
    id: "p3",
    name: "Mouse Gamer",
    description: "Sensor de alta precisão e 6 botões",
    image: mouseG,
    price: 189.5,
  },
  {
    id: "p4",
    name: "Carregador Rápido",
    description: "USB-C 30W com cabo incluso",
    image: charger,
    price: 129.9,
  },
  {
    id: "p5",
    name: "Controle Gamer",
    description: "Compatível com PC e consoles",
    image: controll,
    price: 129.9,
  },

  {
    id: "p6",
    name: "webcam",
    description: "Full HD 1080p com microfone embutido",
    image: webcam,
    price: 129.9,
  },

  {
    id: "p7",
    name: "mousepad",
    description:
      "Mouse pad gamer speed extra grande com borda costurada, proporcionando maior precisão e conforto durante o uso",
    image: mousePad,
    price: 129.9,
  },
  {
    id: "p8",
    name: "Microfone USB",
    description:
      "Experimente a máxima qualidade de áudio e comunicação com o Microfone USB",
    image: micUSB,
    price: 129.9,
  },
]
