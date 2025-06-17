"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MapPin, Plus, Edit, Trash2, Home, Building } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Address } from "@/types/address"

interface AddressBookProps {
  userId: string
}

export function AddressBook({ userId }: AddressBookProps) {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [formData, setFormData] = useState({
    type: "home" as "home" | "work" | "other",
    firstName: "",
    lastName: "",
    company: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    isDefault: false,
  })
  const { toast } = useToast()

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockAddresses: Address[] = [
      {
        id: "1",
        type: "home",
        firstName: "John",
        lastName: "Doe",
        company: "",
        address1: "123 Main Street",
        address2: "Apt 4B",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
        phone: "+1 (555) 123-4567",
        isDefault: true,
      },
      {
        id: "2",
        type: "work",
        firstName: "John",
        lastName: "Doe",
        company: "Tech Corp",
        address1: "456 Business Ave",
        address2: "Suite 200",
        city: "New York",
        state: "NY",
        zipCode: "10002",
        country: "United States",
        phone: "+1 (555) 987-6543",
        isDefault: false,
      },
    ]

    setTimeout(() => {
      setAddresses(mockAddresses)
      setIsLoading(false)
    }, 1000)
  }, [userId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingAddress) {
      // Update existing address
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === editingAddress.id ? { ...formData, id: editingAddress.id } : addr)),
      )
      toast({
        title: "Address updated",
        description: "Your address has been updated successfully.",
      })
    } else {
      // Add new address
      const newAddress: Address = {
        ...formData,
        id: Date.now().toString(),
      }
      setAddresses((prev) => [...prev, newAddress])
      toast({
        title: "Address added",
        description: "Your new address has been added successfully.",
      })
    }

    resetForm()
    setIsDialogOpen(false)
  }

  const resetForm = () => {
    setFormData({
      type: "home",
      firstName: "",
      lastName: "",
      company: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
      isDefault: false,
    })
    setEditingAddress(null)
  }

  const handleEdit = (address: Address) => {
    setFormData(address)
    setEditingAddress(address)
    setIsDialogOpen(true)
  }

  const handleDelete = (addressId: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== addressId))
    toast({
      title: "Address deleted",
      description: "The address has been removed from your address book.",
    })
  }

  const setAsDefault = (addressId: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      })),
    )
    toast({
      title: "Default address updated",
      description: "This address is now your default shipping address.",
    })
  }

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="w-4 h-4" />
      case "work":
        return <Building className="w-4 h-4" />
      default:
        return <MapPin className="w-4 h-4" />
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Address Book ({addresses.length})
          </CardTitle>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Address
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="address1">Address Line 1 *</Label>
                  <Input
                    id="address1"
                    value={formData.address1}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address1: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address2">Address Line 2 (Optional)</Label>
                  <Input
                    id="address2"
                    value={formData.address2}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address2: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => setFormData((prev) => ({ ...prev, zipCode: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="btn-primary">
                    {editingAddress ? "Update Address" : "Add Address"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <Card key={address.id} className={address.isDefault ? "ring-2 ring-black" : ""}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getAddressIcon(address.type)}
                  <span className="font-medium capitalize">{address.type}</span>
                  {address.isDefault && <Badge variant="default">Default</Badge>}
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(address)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(address.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <p className="font-medium">
                  {address.firstName} {address.lastName}
                </p>
                {address.company && <p>{address.company}</p>}
                <p>{address.address1}</p>
                {address.address2 && <p>{address.address2}</p>}
                <p>
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p>{address.country}</p>
                {address.phone && <p>{address.phone}</p>}
              </div>

              {!address.isDefault && (
                <Button variant="outline" size="sm" onClick={() => setAsDefault(address.id)} className="mt-4 w-full">
                  Set as Default
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
