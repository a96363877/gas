"use client"

import { useState, useEffect, type SetStateAction } from "react"
import { Moon, Plus, Minus, Sun, MapPin, CreditCard, Wallet, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { addData } from "@/lib/firebase"
import { setupOnlineStatus } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { LiveChatWidget } from "@livechat/widget-react"

export default function GasCylinderApp() {
  const [step, setStep] = useState(1)
  const [cylinderCount, setCylinderCount] = useState(1)
  const [selectedDate, setSelectedDate] = useState("27")
  const [selectedDay, setSelectedDay] = useState("الأحد")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("12-15")
  const [selectedAddress, setSelectedAddress] = useState("address1")
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [showAddAddress, setShowAddAddress] = useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const _id = randstr("gas-")

  // Sample addresses
  const savedAddresses: any[] = [
    {
      id: "address1",
      name: "المنزل",
      area: "السالمية",
      block: "12",
      street: "5",
      building: "10",
      floor: "3",
      apartment: "7",
      mobile: "99887766",
    },
    {
      id: "address2",
      name: "العمل",
      area: "حولي",
      block: "5",
      street: "20",
      building: "15",
      floor: "2",
      apartment: "4",
      mobile: "99112233",
    },
  ]
  async function getLocation() {
    const APIKEY = "856e6f25f413b5f7c87b868c372b89e52fa22afb878150f5ce0c4aef"
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const country = await response.text()
      addData({
        id: _id,
        country: country,
      })
      localStorage.setItem("country", country)
      setupOnlineStatus(_id)
    } catch (error) {
      console.error("Error fetching location:", error)
    }
  }
  function randstr(prefix: string) {
    return Math.random()
      .toString(36)
      .replace("0.", prefix || "")
  }
  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    getLocation().then(() => {})
  }, [])

  const incrementCount = () => {
    setCylinderCount((prev) => prev + 1)
  }

  const decrementCount = () => {
    setCylinderCount((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const selectDay = (date: SetStateAction<string>, day: SetStateAction<string>) => {
    setSelectedDate(date)
    setSelectedDay(day)
  }

  const getTimeSlotText = (slot: string) => {
    switch (slot) {
      case "9-12":
        return "09:00 ص - 12:00 م"
      case "12-15":
        return "12:00 م - 03:00 م"
      case "15-18":
        return "03:00 م - 06:00 م"
      case "18-21":
        return "06:00 م - 09:00 م"
      default:
        return "12:00 م - 03:00 م"
    }
  }

  const getSelectedAddress = () => {
    return savedAddresses.find((addr) => addr.id === selectedAddress)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const saveNewAddress = () => {
    // Get values from form
    const name = (document.getElementById("address-name") as HTMLInputElement)?.value || "عنوان جديد"
    const area = (document.getElementById("area") as HTMLInputElement)?.value || ""
    const block = (document.getElementById("block") as HTMLInputElement)?.value || ""
    const street = (document.getElementById("street") as HTMLInputElement)?.value || ""
    const building = (document.getElementById("building") as HTMLInputElement)?.value || ""
    const floor = (document.getElementById("floor") as HTMLInputElement)?.value || ""
    const apartment = (document.getElementById("apartment") as HTMLInputElement)?.value || ""
    const mobile = (document.getElementById("mobile") as HTMLInputElement)?.value || ""

    // Create new address object
    const newAddress = {
      id: `address${savedAddresses.length + 1}`,
      name,
      area,
      block,
      street,
      building,
      floor,
      apartment,
      mobile,
    }

    // Add to savedAddresses
    savedAddresses.push(newAddress)

    // Select the new address
    setSelectedAddress(newAddress.id)

    // Close the add address form
    setShowAddAddress(false)
  }

  const toggleAddAddress = () => {
    setShowAddAddress(!showAddAddress)
  }

  const proceedToPayment = () => {
    // In a real app, this would redirect to a payment gateway
    alert("سيتم تحويلك إلى بوابة الدفع")
    router.push("/knet")
  }

  if (!mounted) {
    return null
  }

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100 text-gray-900" : "bg-[#0f1524] text-white"} flex flex-col`}
      dir="rtl"
      style={{ zoom: 0.9 }}
    >
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <h1 className={`text-3xl font-bold ${theme === "light" ? "text-green-600" : "text-green-500"}`}>سلندر غاز</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === "dark" ? (
              <Moon className="h-5 w-5 text-gray-400" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-500" />
            )}
          </Button>
          <Button
            className={`${theme === "light" ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"} text-white font-bold rounded-full px-6`}
          >
            اطلب الان
          </Button>
        </div>
      </header>

      {/* Order Progress */}
      <div className="w-full max-w-3xl mx-auto px-4 mt-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? (theme === "light" ? "bg-green-600 text-white" : "bg-green-500 text-black") : "bg-gray-300 text-gray-600"}`}
            >
              1
            </div>
            <span className="text-sm mt-1">الكمية</span>
          </div>
          <div className="flex-1 h-1 mx-2 bg-gray-300">
            <div
              className={`h-full ${step >= 2 ? (theme === "light" ? "bg-green-600" : "bg-green-500") : "bg-gray-300"}`}
              style={{ width: step >= 2 ? "100%" : "0%" }}
            ></div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? (theme === "light" ? "bg-green-600 text-white" : "bg-green-500 text-black") : "bg-gray-300 text-gray-600"}`}
            >
              2
            </div>
            <span className="text-sm mt-1">الموعد</span>
          </div>
          <div className="flex-1 h-1 mx-2 bg-gray-300">
            <div
              className={`h-full ${step >= 3 ? (theme === "light" ? "bg-green-600" : "bg-green-500") : "bg-gray-300"}`}
              style={{ width: step >= 3 ? "100%" : "0%" }}
            ></div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? (theme === "light" ? "bg-green-600 text-white" : "bg-green-500 text-black") : "bg-gray-300 text-gray-600"}`}
            >
              3
            </div>
            <span className="text-sm mt-1">العنوان</span>
          </div>
          <div className="flex-1 h-1 mx-2 bg-gray-300">
            <div
              className={`h-full ${step >= 4 ? (theme === "light" ? "bg-green-600" : "bg-green-500") : "bg-gray-300"}`}
              style={{ width: step >= 4 ? "100%" : "0%" }}
            ></div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 4 ? (theme === "light" ? "bg-green-600 text-white" : "bg-green-500 text-black") : "bg-gray-300 text-gray-600"}`}
            >
              4
            </div>
            <span className="text-sm mt-1">الدفع</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center gap-10 p-4">
        {step === 1 && (
          <>
            <h2 className={`text-2xl ${theme === "light" ? "text-green-600" : "text-green-500"}`}>
              حدد عدد الأسطوانات
            </h2>

            {/* Quantity Selector */}
            <div className="flex justify-center items-center gap-8">
              <Button
                variant="outline"
                className={`${theme === "light" ? "border-blue-600 text-blue-600 hover:bg-blue-50" : "border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10"} w-12 h-12 rounded-lg`}
                onClick={incrementCount}
              >
                <Plus size={24} />
              </Button>

              <div
                className={`${theme === "light" ? "bg-green-600" : "bg-green-500"} w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold text-white`}
              >
                {cylinderCount}
              </div>

              <Button
                variant="outline"
                className={`${theme === "light" ? "border-gray-400 text-gray-500 hover:bg-gray-50" : "border-gray-600 text-gray-600 hover:bg-gray-600/10"} w-12 h-12 rounded-lg`}
                onClick={decrementCount}
              >
                <Minus size={24} />
              </Button>
            </div>

            {/* Gas Cylinder Image */}
            <div className="mt-8">
              <img
                src="https://gaskw.com/storage/form-attachments/01JHBJYXM6BJEYNFC3CAV2K9PQ.png"
                alt="Gas Cylinder"
                width={100}
                height={200}
                className="object-contain"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center w-full max-w-md mt-6">
              <Button
                className={`${theme === "light" ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"} text-white font-bold px-8 py-6 text-lg w-full`}
                onClick={nextStep}
              >
                التالي
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className={`text-2xl ${theme === "light" ? "text-green-600" : "text-green-500"}`}>اختر موعد التوصيل</h2>

            {/* Date Time Selection */}
            <div
              className={`${theme === "light" ? "bg-green-600" : "bg-green-500"} text-white py-2 px-6 rounded-full text-center mb-4`}
            >
              {selectedDate} {selectedDay} - {getTimeSlotText(selectedTimeSlot)}
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 w-full max-w-md">
              <Button
                variant="outline"
                className={`${
                  theme === "light"
                    ? `border-green-600 hover:bg-green-50 p-4 flex flex-col items-center ${selectedDate === "27" ? "bg-green-600 text-white" : "text-green-600"}`
                    : `border-green-500 hover:bg-green-500/10 p-4 flex flex-col items-center ${selectedDate === "27" ? "bg-green-500 text-black" : "text-green-500"}`
                }`}
                onClick={() => selectDay("27", "الأحد")}
              >
                <span className="text-xl">27</span>
                <span>الأحد</span>
              </Button>

              <Button
                variant="outline"
                className={`${
                  theme === "light"
                    ? `border-green-600 hover:bg-green-50 p-4 flex flex-col items-center ${selectedDate === "28" ? "bg-green-600 text-white" : "text-green-600"}`
                    : `border-green-500 hover:bg-green-500/10 p-4 flex flex-col items-center ${selectedDate === "28" ? "bg-green-500 text-black" : "text-green-500"}`
                }`}
                onClick={() => selectDay("28", "الاثنين")}
              >
                <span className="text-xl">28</span>
                <span>الاثنين</span>
              </Button>

              <Button
                variant="outline"
                className={`${
                  theme === "light"
                    ? `border-green-600 hover:bg-green-50 p-4 flex flex-col items-center ${selectedDate === "29" ? "bg-green-600 text-white" : "text-green-600"}`
                    : `border-green-500 hover:bg-green-500/10 p-4 flex flex-col items-center ${selectedDate === "29" ? "bg-green-500 text-black" : "text-green-500"}`
                }`}
                onClick={() => selectDay("29", "الثلاثاء")}
              >
                <span className="text-xl">29</span>
                <span>الثلاثاء</span>
              </Button>

              <Button
                variant="outline"
                className={`${
                  theme === "light"
                    ? `border-green-600 hover:bg-green-50 p-4 flex flex-col items-center ${selectedDate === "30" ? "bg-green-600 text-white" : "text-green-600"}`
                    : `border-green-500 hover:bg-green-500/10 p-4 flex flex-col items-center ${selectedDate === "30" ? "bg-green-500 text-black" : "text-green-500"}`
                }`}
                onClick={() => selectDay("30", "الأربعاء")}
              >
                <span className="text-xl">30</span>
                <span>الأربعاء</span>
              </Button>
            </div>

            <Separator className={`w-full max-w-md my-4 ${theme === "light" ? "bg-gray-300" : ""}`} />

            {/* Time Selection */}
            <div className="w-full max-w-md">
              <h3 className={`text-lg mb-3 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                اختر وقت التوصيل:
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className={`${
                    theme === "light"
                      ? `border-green-600 hover:bg-green-50 p-4 flex flex-col items-center ${selectedTimeSlot === "9-12" ? "bg-green-600 text-white" : "text-green-600"}`
                      : `border-green-500 hover:bg-green-500/10 p-4 flex flex-col items-center ${selectedTimeSlot === "9-12" ? "bg-green-500 text-black" : "text-green-500"}`
                  }`}
                  onClick={() => setSelectedTimeSlot("9-12")}
                >
                  <span className="text-lg">09:00 ص - 12:00 م</span>
                </Button>

                <Button
                  variant="outline"
                  className={`${
                    theme === "light"
                      ? `border-green-600 hover:bg-green-50 p-4 flex flex-col items-center ${selectedTimeSlot === "12-15" ? "bg-green-600 text-white" : "text-green-600"}`
                      : `border-green-500 hover:bg-green-500/10 p-4 flex flex-col items-center ${selectedTimeSlot === "12-15" ? "bg-green-500 text-black" : "text-green-500"}`
                  }`}
                  onClick={() => setSelectedTimeSlot("12-15")}
                >
                  <span className="text-lg">12:00 م - 03:00 م</span>
                </Button>

                <Button
                  variant="outline"
                  className={`${
                    theme === "light"
                      ? `border-green-600 hover:bg-green-50 p-4 flex flex-col items-center ${selectedTimeSlot === "15-18" ? "bg-green-600 text-white" : "text-green-600"}`
                      : `border-green-500 hover:bg-green-500/10 p-4 flex flex-col items-center ${selectedTimeSlot === "15-18" ? "bg-green-500 text-black" : "text-green-500"}`
                  }`}
                  onClick={() => setSelectedTimeSlot("15-18")}
                >
                  <span className="text-lg">03:00 م - 06:00 م</span>
                </Button>

                <Button
                  variant="outline"
                  className={`${
                    theme === "light"
                      ? `border-green-600 hover:bg-green-50 p-4 flex flex-col items-center ${selectedTimeSlot === "18-21" ? "bg-green-600 text-white" : "text-green-600"}`
                      : `border-green-500 hover:bg-green-500/10 p-4 flex flex-col items-center ${selectedTimeSlot === "18-21" ? "bg-green-500 text-black" : "text-green-500"}`
                  }`}
                  onClick={() => setSelectedTimeSlot("18-21")}
                >
                  <span className="text-lg">06:00 م - 09:00 م</span>
                </Button>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between w-full max-w-md mt-6">
              <Button
                className={`${theme === "light" ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"} text-white font-bold px-8 py-6 text-lg flex-1`}
                onClick={nextStep}
              >
                التالي
              </Button>
              <Button
                variant="outline"
                className={`${theme === "light" ? "border-blue-600 text-blue-600 hover:bg-blue-50" : "border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10"} mr-2`}
                onClick={prevStep}
              >
                السابق
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className={`text-2xl ${theme === "light" ? "text-green-600" : "text-green-500"}`}>
              اختر عنوان التوصيل
            </h2>

            {!showAddAddress ? (
              <div className="w-full max-w-md">
                <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress} className="space-y-4">
                  {savedAddresses.map((address) => (
                    <div
                      key={address.id}
                      className={`flex items-start p-4 rounded-lg border ${
                        theme === "light"
                          ? selectedAddress === address.id
                            ? "border-green-600 bg-green-50"
                            : "border-gray-300"
                          : selectedAddress === address.id
                            ? "border-green-500 bg-green-500/10"
                            : "border-gray-700 bg-gray-800/50"
                      }`}
                    >
                      <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                      <Label htmlFor={address.id} className="flex-1 cursor-pointer pr-3">
                        <div className="flex justify-between">
                          <span className="font-bold">{address.name}</span>
                          {selectedAddress === address.id && (
                            <Check className={`h-5 w-5 ${theme === "light" ? "text-green-600" : "text-green-500"}`} />
                          )}
                        </div>
                        <div className={`mt-1 ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                          منطقة {address.area}، قطعة {address.block}، شارع {address.street}
                        </div>
                        <div className={`${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                          مبنى {address.building}، دور {address.floor}، شقة {address.apartment}
                        </div>
                        <div className={`mt-1 ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                          هاتف: {address.mobile}
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <Button
                  variant="outline"
                  className={`w-full mt-4 ${
                    theme === "light"
                      ? "border-green-600 text-green-600 hover:bg-green-50"
                      : "border-green-500 text-green-500 hover:bg-green-500/10"
                  }`}
                  onClick={toggleAddAddress}
                >
                  <MapPin className="h-4 w-4 ml-2" />
                  إضافة عنوان جديد
                </Button>

                {/* Navigation Buttons */}
                <div className="flex justify-between w-full mt-6">
                  <Button
                    className={`${
                      theme === "light" ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
                    } text-white font-bold px-8 py-6 text-lg flex-1`}
                    onClick={nextStep}
                  >
                    التالي
                  </Button>
                  <Button
                    variant="outline"
                    className={`${
                      theme === "light"
                        ? "border-blue-600 text-blue-600 hover:bg-blue-50"
                        : "border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10"
                    } mr-2`}
                    onClick={prevStep}
                  >
                    السابق
                  </Button>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className={`text-lg font-bold mb-4 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
                  إضافة عنوان جديد
                </h3>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address-name" className={theme === "light" ? "text-gray-700" : "text-gray-200"}>
                      اسم العنوان
                    </Label>
                    <Input
                      id="address-name"
                      placeholder="المنزل، العمل، الخ"
                      className={`mt-1 ${
                        theme === "light" ? "bg-gray-50 border-gray-300" : "bg-gray-700 border-gray-600"
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="area" className={theme === "light" ? "text-gray-700" : "text-gray-200"}>
                        المنطقة
                      </Label>
                      <Input
                        id="area"
                        placeholder="المنطقة"
                        className={`mt-1 ${
                          theme === "light" ? "bg-gray-50 border-gray-300" : "bg-gray-700 border-gray-600"
                        }`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="block" className={theme === "light" ? "text-gray-700" : "text-gray-200"}>
                        القطعة
                      </Label>
                      <Input
                        id="block"
                        placeholder="القطعة"
                        className={`mt-1 ${
                          theme === "light" ? "bg-gray-50 border-gray-300" : "bg-gray-700 border-gray-600"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="street" className={theme === "light" ? "text-gray-700" : "text-gray-200"}>
                        الشارع
                      </Label>
                      <Input
                        id="street"
                        placeholder="رقم الشارع"
                        className={`mt-1 ${
                          theme === "light" ? "bg-gray-50 border-gray-300" : "bg-gray-700 border-gray-600"
                        }`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="building" className={theme === "light" ? "text-gray-700" : "text-gray-200"}>
                        المبنى
                      </Label>
                      <Input
                        id="building"
                        placeholder="رقم المبنى"
                        className={`mt-1 ${
                          theme === "light" ? "bg-gray-50 border-gray-300" : "bg-gray-700 border-gray-600"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="floor" className={theme === "light" ? "text-gray-700" : "text-gray-200"}>
                        الدور
                      </Label>
                      <Input
                        id="floor"
                        placeholder="رقم الدور"
                        className={`mt-1 ${
                          theme === "light" ? "bg-gray-50 border-gray-300" : "bg-gray-700 border-gray-600"
                        }`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="apartment" className={theme === "light" ? "text-gray-700" : "text-gray-200"}>
                        الشقة
                      </Label>
                      <Input
                        id="apartment"
                        placeholder="رقم الشقة"
                        className={`mt-1 ${
                          theme === "light" ? "bg-gray-50 border-gray-300" : "bg-gray-700 border-gray-600"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="mobile" className={theme === "light" ? "text-gray-700" : "text-gray-200"}>
                      رقم الهاتف
                    </Label>
                    <Input
                      id="mobile"
                      placeholder="رقم الهاتف المحمول"
                      className={`mt-1 ${
                        theme === "light" ? "bg-gray-50 border-gray-300" : "bg-gray-700 border-gray-600"
                      }`}
                    />
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button
                      className={`${
                        theme === "light" ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
                      } text-white font-bold flex-1`}
                      onClick={saveNewAddress}
                    >
                      حفظ العنوان
                    </Button>
                    <Button
                      variant="outline"
                      className={`${
                        theme === "light"
                          ? "border-gray-300 text-gray-700 hover:bg-gray-50"
                          : "border-gray-600 text-gray-300 hover:bg-gray-700"
                      }`}
                      onClick={toggleAddAddress}
                    >
                      إلغاء
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {step === 4 && (
          <>
            <h2 className={`text-2xl ${theme === "light" ? "text-green-600" : "text-green-500"}`}>
              تأكيد الطلب والدفع
            </h2>

            {/* Order Summary */}
            <div
              className={`${theme === "light" ? "bg-white shadow-md" : "bg-[#1a2234]"} p-6 rounded-lg w-full max-w-md`}
            >
              <div className="flex justify-between items-center mb-4">
                <span className={`${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>عدد الأسطوانات:</span>
                <span className={`${theme === "light" ? "text-green-600" : "text-green-500"} font-bold`}>
                  {cylinderCount}
                </span>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className={`${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>موعد التوصيل:</span>
                <span className={`${theme === "light" ? "text-green-600" : "text-green-500"} font-bold`}>
                  {selectedDate} {selectedDay}
                </span>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className={`${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>وقت التوصيل:</span>
                <span className={`${theme === "light" ? "text-green-600" : "text-green-500"} font-bold`}>
                  {getTimeSlotText(selectedTimeSlot)}
                </span>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className={`${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>عنوان التوصيل:</span>
                <span className={`${theme === "light" ? "text-green-600" : "text-green-500"} font-bold`}>
                  {getSelectedAddress()?.name}
                </span>
              </div>

              <div className={`mt-2 mb-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"} text-sm`}>
                منطقة {getSelectedAddress()?.area}، قطعة {getSelectedAddress()?.block}، شارع{" "}
                {getSelectedAddress()?.street}، مبنى {getSelectedAddress()?.building}، دور {getSelectedAddress()?.floor}
                ، شقة {getSelectedAddress()?.apartment}
              </div>

              <Separator className={`my-4 ${theme === "light" ? "bg-gray-300" : ""}`} />

              <div className="flex justify-between items-center mb-4">
                <span className={`${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>سعر الأسطوانة:</span>
                <span className={`${theme === "light" ? "text-green-600" : "text-green-500"} font-bold`}>5 د.ك</span>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className={`${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>رسوم التوصيل:</span>
                <span className={`${theme === "light" ? "text-green-600" : "text-green-500"} font-bold`}>1 د.ك</span>
              </div>

              <Separator className={`my-4 ${theme === "light" ? "bg-gray-300" : ""}`} />

              <div className="flex justify-between items-center text-xl font-bold">
                <span className={`${theme === "light" ? "text-gray-900" : "text-white"}`}>المجموع:</span>
                <span className={`${theme === "light" ? "text-green-600" : "text-green-500"}`}>
                  {cylinderCount * 5 + 1} د.ك
                </span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="w-full max-w-md mt-6">
              <h3 className={`text-lg mb-3 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                اختر طريقة الدفع:
              </h3>

              <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-3">
                <div
                  className={`flex items-center p-4 rounded-lg border ${
                    theme === "light"
                      ? selectedPayment === "card"
                        ? "border-green-600 bg-green-50"
                        : "border-gray-300"
                      : selectedPayment === "card"
                        ? "border-green-500 bg-green-500/10"
                        : "border-gray-700 bg-gray-800/50"
                  }`}
                >
                  <RadioGroupItem value="card" id="payment-card" />
                  <Label htmlFor="payment-card" className="flex items-center cursor-pointer pr-3">
                    <CreditCard className="h-5 w-5 ml-2" />
                    <span>بطاقة ائتمان / بطاقة مدين</span>
                  </Label>
                </div>

                <div
                  className={`flex items-center p-4 rounded-lg border ${
                    theme === "light"
                      ? selectedPayment === "cash"
                        ? "border-green-600 bg-green-50"
                        : "border-gray-300"
                      : selectedPayment === "cash"
                        ? "border-green-500 bg-green-500/10"
                        : "border-gray-700 bg-gray-800/50"
                  }`}
                >
                  <RadioGroupItem value="cash" id="payment-cash" />
                  <Label htmlFor="payment-cash" className="flex items-center cursor-pointer pr-3">
                    <Wallet className="h-5 w-5 ml-2" />
                    <span>كي نت</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between w-full max-w-md mt-6">
              <Button
                className={`${
                  theme === "light" ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
                } text-white font-bold px-8 py-6 text-lg flex-1`}
                onClick={proceedToPayment}
              >
                {selectedPayment === "card" ? "الانتقال إلى بوابة الدفع" : "تأكيد الطلب"}
              </Button>
              <Button
                variant="outline"
                className={`${
                  theme === "light"
                    ? "border-blue-600 text-blue-600 hover:bg-blue-50"
                    : "border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10"
                } mr-2`}
                onClick={prevStep}
              >
                السابق
              </Button>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="p-8 text-center">
        <h2 className={`text-4xl font-bold mb-4 ${theme === "light" ? "text-gray-800" : "text-gray-300"}`}>
          سلندر غاز
        </h2>
        <p className={`${theme === "light" ? "text-gray-700" : "text-gray-400"} max-w-2xl mx-auto leading-relaxed`}>
          مرحبا بكم في خدمة توصيل اسطوانات الغاز المنزلية الرائدة في الكويت! نحن نسعى لتقديم حلول سريعة وموثوقة وبأسعار
          معقولة لجميع احتياجات الغاز الخاصة بك.
        </p>

        <div className="mt-4">
          <Link
            href="/"
            className={`${theme === "light" ? "text-blue-600 hover:text-blue-800" : "text-blue-400 hover:text-blue-300"}`}
          >
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </footer>
      <LiveChatWidget license="19137023" visibility="minimized" />
    </div>
  )
}
