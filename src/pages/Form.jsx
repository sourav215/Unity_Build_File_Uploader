import React, { useState } from "react";
import { uploadFile, checkForFolder } from "../backend/firebase.js";

import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [dataState, setDataState] = useState(null);
  const [frameworkState, setFrameworkState] = useState(null);
  const [loaderState, setLoaderState] = useState(null);
  const [codeState, setCodeState] = useState(null);

  const [inputState, setInputState] = useState({
    folder: "",
    data: "",
    framework: "",
    loader: "",
    code: "",
  });
  const [loading, setLoading] = useState({
    data: false,
    framework: false,
    loader: false,
    code: false,
  });

  const handleFolderExist = async () => {
    let result = await checkForFolder(inputState.folder);
    // console.log("Res: ", result);
    if (Object.keys(result).length === 0) {
      setInputState({
        ...inputState,
        data: "",
        framework: "",
        loader: "",
        code: "",
      });
      toast.warn("No such folder", {
        position: "top-center",
        theme: "colored",
        autoClose: 1000,
        hideProgressBar: true,
      });
    } else {
      setInputState({ ...inputState, ...result });
      toast.warn("Already Present", {
        position: "top-center",
        theme: "colored",
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  };

  const handleDataUpload = async () => {
    try {
      if (!inputState.folder) {
        toast.error("Enter Folder Name", {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
          hideProgressBar: true,
        });
        return;
      }
      if (!dataState) {
        toast.error("Select File", {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
          hideProgressBar: true,
        });
        return;
      }
      if (!dataState.name.includes("data")) {
        toast.error("Selected File is Not a Data File", {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
          hideProgressBar: true,
        });
        return;
      }
      setLoading({ ...loading, data: true });
      let url = await uploadFile(
        `Virtual Labs 1.0/${inputState.folder}`,
        dataState
      );
      setLoading({ ...loading, data: false });
      console.log("Url in Index.js", url);
      setInputState({ ...inputState, data: url });
    } catch (err) {
      setLoading({ ...loading, data: false });
      console.log(err);
    }
  };
  const handleFrameworkUpload = async () => {
    try {
      if (!inputState.folder) {
        toast.error("Enter Folder Name", {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
          hideProgressBar: true,
        });
        return;
      }
      if (!frameworkState) {
        toast.error("Select File", {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
          hideProgressBar: true,
        });
        return;
      }
      if (!frameworkState.name.includes("framework")) {
        toast.error("Selected File is Not a Framework File", {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
          hideProgressBar: true,
        });
        return;
      }
      setLoading({ ...loading, framework: true });
      let url = await uploadFile(
        `Virtual Labs 1.0/${inputState.folder}`,
        frameworkState
      );
      setLoading({ ...loading, framework: false });
      // console.log("Url in Index.js", url);
      setInputState({ ...inputState, framework: url });
    } catch (err) {
      setLoading({ ...loading, framework: false });
      console.log(err);
    }
  };
  const handleLoaderUpload = async () => {
    try {
      if (!inputState.folder) {
        toast.error("Enter Folder Name", {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
          hideProgressBar: true,
        });
        return;
      }
      if (!loaderState) {
        toast.error("Select File", {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
          hideProgressBar: true,
        });
        return;
      }
      if (!loaderState.name.includes("loader")) {
        toast.error("Selected File is Not a Loader File", {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
          hideProgressBar: true,
        });
        return;
      }
      setLoading({ ...loading, loader: true });
      let url = await uploadFile(
        `Virtual Labs 1.0/${inputState.folder}`,
        loaderState
      );
      setLoading({ ...loading, loader: false });
      // console.log("Url in Index.js", url);
      setInputState({ ...inputState, loader: url });
    } catch (err) {
      setLoading({ ...loading, loader: false });
      console.log(err);
    }
  };
  const handleCodeUpload = async () => {
    try {
      if (!inputState.folder) {
        toast.error("Enter Folder Name", {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
          hideProgressBar: true,
        });
        return;
      }
      if (!codeState) {
        toast.error("Select File", {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
          hideProgressBar: true,
        });
        return;
      }
      if (!codeState.name.includes("wasm")) {
        toast.error("Selected File is Not a Code File", {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
          hideProgressBar: true,
        });
        return;
      }
      setLoading({ ...loading, code: true });
      let url = await uploadFile(
        `Virtual Labs 1.0/${inputState.folder}`,
        codeState
      );
      setLoading({ ...loading, code: false });
      // console.log("Url in Index.js", url);
      setInputState({ ...inputState, code: url });
    } catch (err) {
      setLoading({ ...loading, code: false });
      console.log(err);
    }
  };
  const handleCopyText = (value) => {
    console.log(value);
    navigator.clipboard
      .writeText(inputState[value])
      .then(() => {
        toast.success("Link Copied", {
          position: "top-center",
          theme: "colored",
          autoClose: 500,
          hideProgressBar: true,
        });
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  };
  // console.log(inputState);
  return (
    <Box
      sx={{
        background: "#D1F2EB",
        minHeight: "100vh",
      }}
    >
      <Grid
        container
        sx={{
          paddingTop: "40px",
          justifyContent: "center",
        }}
      >
        <Grid item xs={10} sm={5}>
          <Paper
            sx={{
              padding: "20px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                marginBottom: "20px",
                textAlign: "center",
                fontWeight: "600",
                letterSpacing: "1px",
              }}
            >
              Virtual Labs 1.0
            </Typography>

            <Stack spacing={2}>
              <Box>
                <Stack spacing={2} direction={"row"}>
                  <TextField
                    fullWidth
                    // variant="standard"
                    label="Enter Folder Name"
                    name="folder"
                    value={inputState.folder}
                    onChange={(e) => {
                      setInputState({
                        ...inputState,
                        folder: e.target.value,
                      });
                    }}
                  />
                  <Button
                    style={{
                      color: "white",
                      background: "#2ECC71",
                      padding: "2px 12px",
                      height: "30px",
                      marginTop: "10px",
                    }}
                    onClick={handleFolderExist}
                  >
                    Verify
                  </Button>
                </Stack>
              </Box>
              {/* Data */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  rowGap: "10px",
                }}
              >
                <Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      textAlign={"left"}
                      variant={"h6"}
                      letterSpacing={"0.5px"}
                      fontWeight={"600"}
                    >
                      Data
                    </Typography>
                    {inputState.data && (
                      <CheckCircleIcon
                        fontSize="small"
                        sx={{
                          color: "#2ECC71",
                          marginTop: "7px",
                          marginLeft: "5px",
                        }}
                        onClick={handleCopyText}
                      />
                    )}
                  </Box>
                  <Box>
                    <input
                      type="file"
                      onChange={(e) => setDataState(e.target.files[0])}
                    />
                  </Box>
                </Box>
                <Box sx={{ marginTop: "12px" }}>
                  {!inputState.data ? (
                    <LoadingButton
                      size="small"
                      style={{
                        color: "white",
                        background: "#2ECC71",
                        padding: "2px 12px",
                        height: "30px",
                      }}
                      onClick={handleDataUpload}
                      endIcon={<CloudUploadIcon />}
                      loading={loading.data}
                      loadingPosition="end"
                      variant="contained"
                    >
                      <span>Upload</span>
                    </LoadingButton>
                  ) : (
                    <Button
                      style={{
                        color: "white",
                        background: "#2ECC71",
                        padding: "2px 12px",
                        height: "30px",
                      }}
                      endIcon={<ContentCopyIcon />}
                      onClick={() => {
                        handleCopyText("data");
                      }}
                    >
                      Url
                    </Button>
                  )}
                </Box>
              </Box>
              {/* Data */}
              {/* Framework */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  rowGap: "10px",
                }}
              >
                <Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      textAlign={"left"}
                      variant={"h6"}
                      letterSpacing={"0.5px"}
                      fontWeight={"600"}
                    >
                      Framework
                    </Typography>
                    {inputState.framework && (
                      <CheckCircleIcon
                        fontSize="small"
                        sx={{
                          color: "#2ECC71",
                          marginTop: "7px",
                          marginLeft: "5px",
                        }}
                        // onClick={handleCopyText}
                      />
                    )}
                  </Box>
                  <Box>
                    <input
                      type="file"
                      onChange={(e) => setFrameworkState(e.target.files[0])}
                    />
                  </Box>
                </Box>
                <Box sx={{ marginTop: "12px" }}>
                  {!inputState?.framework ? (
                    <LoadingButton
                      size="small"
                      style={{
                        color: "white",
                        background: "#2ECC71",
                        padding: "2px 12px",
                        height: "30px",
                      }}
                      onClick={handleFrameworkUpload}
                      endIcon={<CloudUploadIcon />}
                      loading={loading.framework}
                      loadingPosition="end"
                      variant="contained"
                    >
                      <span>Upload</span>
                    </LoadingButton>
                  ) : (
                    <Button
                      style={{
                        color: "white",
                        background: "#2ECC71",
                        padding: "2px 12px",
                        height: "30px",
                      }}
                      endIcon={<ContentCopyIcon />}
                      onClick={() => {
                        handleCopyText("framework");
                      }}
                    >
                      Url
                    </Button>
                  )}
                </Box>
              </Box>
              {/* Framework */}
              {/* Loader */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  rowGap: "10px",
                }}
              >
                <Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      textAlign={"left"}
                      variant={"h6"}
                      letterSpacing={"0.5px"}
                      fontWeight={"600"}
                    >
                      Loader
                    </Typography>
                    {inputState.loader && (
                      <CheckCircleIcon
                        fontSize="small"
                        sx={{
                          color: "#2ECC71",
                          marginTop: "7px",
                          marginLeft: "5px",
                        }}
                        // onClick={handleCopyText}
                      />
                    )}
                  </Box>
                  <Box>
                    <input
                      type="file"
                      onChange={(e) => setLoaderState(e.target.files[0])}
                    />
                  </Box>
                </Box>
                <Box sx={{ marginTop: "12px" }}>
                  {!inputState.loader ? (
                    <LoadingButton
                      size="small"
                      style={{
                        color: "white",
                        background: "#2ECC71",
                        padding: "2px 12px",
                        height: "30px",
                      }}
                      onClick={handleLoaderUpload}
                      endIcon={<CloudUploadIcon />}
                      loading={loading.loader}
                      loadingPosition="end"
                      variant="contained"
                    >
                      <span>Upload</span>
                    </LoadingButton>
                  ) : (
                    <Button
                      style={{
                        color: "white",
                        background: "#2ECC71",
                        padding: "2px 12px",
                        height: "30px",
                      }}
                      endIcon={<ContentCopyIcon />}
                      onClick={() => {
                        handleCopyText("loader");
                      }}
                    >
                      Url
                    </Button>
                  )}
                </Box>
              </Box>
              {/* Loader */}
              {/* Code */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  rowGap: "10px",
                }}
              >
                <Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      textAlign={"left"}
                      variant={"h6"}
                      letterSpacing={"0.5px"}
                      fontWeight={"600"}
                    >
                      Code / Wasm
                    </Typography>
                    {inputState.code && (
                      <CheckCircleIcon
                        fontSize="small"
                        sx={{
                          color: "#2ECC71",
                          marginTop: "7px",
                          marginLeft: "5px",
                        }}
                      />
                    )}
                  </Box>
                  <Box>
                    <input
                      type="file"
                      onChange={(e) => setCodeState(e.target.files[0])}
                    />
                  </Box>
                </Box>
                <Box sx={{ marginTop: "12px" }}>
                  {!inputState.code ? (
                    <LoadingButton
                      size="small"
                      style={{
                        color: "white",
                        background: "#2ECC71",
                        padding: "2px 12px",
                        height: "30px",
                      }}
                      onClick={handleCodeUpload}
                      endIcon={<CloudUploadIcon />}
                      loading={loading.code}
                      loadingPosition="end"
                      variant="contained"
                    >
                      <span>Upload</span>
                    </LoadingButton>
                  ) : (
                    <Button
                      style={{
                        color: "white",
                        background: "#2ECC71",
                        padding: "2px 12px",
                        height: "30px",
                      }}
                      endIcon={<ContentCopyIcon />}
                      onClick={() => {
                        handleCopyText("code");
                      }}
                    >
                      Url
                    </Button>
                  )}
                </Box>
              </Box>
              {/* Code */}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <ToastContainer />
    </Box>
  );
};

export default Form;
