import { Menu } from "@mui/material";

interface IMenuDropdown {
  handleClose: () => void;
  anchorEl: HTMLElement | null;
  children: JSX.Element | JSX.Element[];
}

export default function MenuDropdown({
  handleClose,
  anchorEl,
  children,
}: IMenuDropdown) {
  const open = Boolean(anchorEl);

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 1,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 2,
            minWidth: "200px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            // the ticker
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: "20px",
              width: 15,
              height: 15,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {children}
      </Menu>
    </>
  );
}
