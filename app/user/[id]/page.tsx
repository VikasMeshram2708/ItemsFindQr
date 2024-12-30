import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPinned, Phone, Calendar } from "lucide-react";
import { Label } from "@/components/ui/label";

import { getProfile } from "@/app/actions/actions";

export default async function Profile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data, error } = await getProfile(id);
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{error}</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <Card className="max-w-lg w-full shadow-lg">
        <CardHeader className="space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={data?.image || "https://github.com/shadcn.png"}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl">
                {data?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <CardTitle className="text-2xl capitalize mb-2">
                {data?.name}
              </CardTitle>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Joined {data?.createdAt.toDateString()}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Updated {data?.updatedAt.toDateString()}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-gray-500" />
              <div className="space-y-1">
                <Label className="text-sm text-gray-500">Email</Label>
                <div>{data?.email}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <MapPinned className="h-5 w-5 text-gray-500" />
              <div className="space-y-1">
                <Label className="text-sm text-gray-500">Current Address</Label>
                <div>{data?.currentAddress}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <MapPinned className="h-5 w-5 text-gray-500" />
              <div className="space-y-1">
                <Label className="text-sm text-gray-500">
                  Permanent Address
                </Label>
                <div>{data?.permanentAddress}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Phone className="h-5 w-5 text-gray-500" />
              <div className="space-y-1">
                <Label className="text-sm text-gray-500">Personal Number</Label>
                <div>{data?.personalNo}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Phone className="h-5 w-5 text-gray-500" />
              <div className="space-y-1">
                <Label className="text-sm text-gray-500">
                  Guardian's Number
                </Label>
                <div>{data?.guardiansNo}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
