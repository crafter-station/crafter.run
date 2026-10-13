/* Common series per brand for the model autocomplete. Free text is always accepted. */
export const laptopModels: Record<string, string[]> = {
  Apple: ["MacBook Air 13\" M1", "MacBook Air 13\" M2", "MacBook Air 13\" M3", "MacBook Air 13\" M4", "MacBook Air 15\" M2", "MacBook Air 15\" M3", "MacBook Air 15\" M4",
    "MacBook Pro 13\" M1", "MacBook Pro 13\" M2", "MacBook Pro 14\" M1 Pro", "MacBook Pro 14\" M2 Pro", "MacBook Pro 14\" M3", "MacBook Pro 14\" M3 Pro", "MacBook Pro 14\" M4", "MacBook Pro 14\" M4 Pro",
    "MacBook Pro 14\" M5", "MacBook Pro 14\" M5 Pro", "MacBook Pro 16\" M1 Pro", "MacBook Pro 16\" M3 Max", "MacBook Pro 16\" M4 Pro", "MacBook Pro 16\" M4 Max", "MacBook Pro 16\" M5 Pro", "MacBook Pro (Intel)", "MacBook Air (Intel)"],
  Lenovo: ["ThinkPad E14", "ThinkPad E16", "ThinkPad T14", "ThinkPad T14s", "ThinkPad X1 Carbon", "ThinkPad L14", "ThinkBook 14", "ThinkBook 16", "IdeaPad 3", "IdeaPad 5", "IdeaPad Slim 3", "IdeaPad Slim 5", "IdeaPad Gaming 3", "Yoga 7", "Yoga Slim 7", "Legion 5", "Legion 5 Pro", "Legion 7", "LOQ 15"],
  HP: ["Pavilion 14", "Pavilion 15", "Pavilion x360", "Victus 15", "Victus 16", "OMEN 16", "Envy x360", "Envy 13", "Spectre x360", "ProBook 440", "ProBook 450", "EliteBook 840", "EliteBook 640", "HP 14", "HP 15", "250 G9", "255 G9"],
  Dell: ["Inspiron 14", "Inspiron 15", "Inspiron 16", "Vostro 14", "Vostro 15", "Latitude 5440", "Latitude 7440", "XPS 13", "XPS 14", "XPS 15", "G15", "G16", "Alienware m16", "Dell 14", "Dell 15"],
  Asus: ["VivoBook 14", "VivoBook 15", "VivoBook 16", "VivoBook S14", "Zenbook 14", "Zenbook 14 OLED", "Zenbook Duo", "TUF Gaming A15", "TUF Gaming F15", "ROG Strix G16", "ROG Zephyrus G14", "ROG Flow X13", "ExpertBook B1"],
  Acer: ["Aspire 3", "Aspire 5", "Aspire 7", "Aspire Go 15", "Swift 3", "Swift Go 14", "Nitro 5", "Nitro V 15", "Predator Helios Neo 16", "Predator Helios 16", "TravelMate P2"],
  MSI: ["Modern 14", "Modern 15", "Prestige 14", "Thin GF63", "Cyborg 15", "Katana 15", "Sword 15", "Bravo 15", "Stealth 16", "Raider GE78"],
  Samsung: ["Galaxy Book4", "Galaxy Book4 Pro", "Galaxy Book3", "Galaxy Book3 Pro", "Galaxy Book2", "Galaxy Book Flex"],
  Huawei: ["MateBook D14", "MateBook D15", "MateBook D16", "MateBook 14", "MateBook X Pro"],
  Microsoft: ["Surface Laptop 5", "Surface Laptop 6", "Surface Laptop 7", "Surface Laptop Go 3", "Surface Pro 9", "Surface Pro 10", "Surface Pro 11"],
  LG: ["gram 14", "gram 15", "gram 16", "gram 17", "gram Style"],
  Toshiba: ["Satellite", "Satellite Pro", "Tecra", "Portégé", "Dynabook"],
}
