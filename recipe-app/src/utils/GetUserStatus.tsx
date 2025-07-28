import { STATUS } from "../constants/status.const";
import { USER_ROLE } from "../constants/user.const";
import { Role } from "../types/role";
import { Status } from "../types/status";

function getUserStatus(role: Role): Status {
	return role === USER_ROLE.ADMIN ? STATUS.PUBLIC : STATUS.PRIVATE;
}

export default getUserStatus;
