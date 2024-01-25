import { RentalAgency } from "@/app/firebase/types"
import {
  getUpdateUserDataByEmail,
  checkUpdateSessionIsExpired,
} from "@/app/firebase/utils"
import { deleteDoc } from "firebase/firestore"

const authRoutes = ["/agency/login", "/agency/register"]
const moreInfosRoute = "/agency/more-infos"
const agencyPath = "/agency"
const sensitivePath = "/agency/profile/edit/sensitive"
const sensitiveConfirmPath = "/agency/profile/edit/sensitive/confirm"

export const getRedirectAuthMiddlewareURL = (
  isLoggedIn: boolean,
  user: RentalAgency | undefined,
  pathname: string,
): string => {
  // If user is logged with role in and attempts to access to auth routes or more infos routes
  if (
    isLoggedIn &&
    (authRoutes.includes(pathname) ||
      (pathname === moreInfosRoute && user?.role))
  ) {
    return agencyPath
  }
  // If user is not logged in and attempts to access protected agency routes
  if (!isLoggedIn && !authRoutes.includes(pathname)) {
    return "/agency/login"
  }
  // If user is logged in but has not filled additionnal informations --> redirect to more infos page
  if (
    isLoggedIn &&
    !user?.role &&
    pathname.includes("/agency") &&
    pathname !== moreInfosRoute
  ) {
    return "/agency/more-infos"
  }
  return ""
}

export const getRedirectSensitiveDataMiddlewareURL = async (
  user: RentalAgency | undefined,
  pathname: string,
): Promise<string> => {
  // Get document in updateUserCollection
  const updateUserData = await getUpdateUserDataByEmail(user?.email || "")
  if (updateUserData) {
    // Check if access token is expired
    const isTokenExpired = checkUpdateSessionIsExpired(
      updateUserData?.data.expiresAt,
    )
    // If it is, remove the document in the collection & redirect to confirm page (to write password)
    if (isTokenExpired && pathname === sensitivePath) {
      await deleteDoc(updateUserData.ref)
      return sensitiveConfirmPath
    }
    // If token is not expired and user attempts to go on confirm page, redirect it to edit sensitive data page
    if (!isTokenExpired && pathname === sensitiveConfirmPath) {
      return sensitivePath
    }
  } else {
    // Redirect directly to confirmation page if document wasn't found.
    if (pathname === sensitivePath) {
      return sensitiveConfirmPath
    }
  }
  return ""
}
