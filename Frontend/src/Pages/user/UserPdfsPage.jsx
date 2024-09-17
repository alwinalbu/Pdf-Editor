import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Spinner,
  Button,
} from "@nextui-org/react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Checkbox,
  Grid2,
} from "@mui/material";
import { EditIcon } from "../../components/EditIcon";
import { DeleteIcon } from "../../components/DeleteIcon";
import { EyeIcon } from "../../components/EyeIcon";
import { URL } from "../../utlis/constants";
import { commonRequest } from "../../utlis/commonRequest";
import WebViewer from "@pdftron/webviewer";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { PDFDocument } from "pdf-lib";


const UserPdfsPage = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [instance, setInstance] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const viewerRef = useRef(null);
  const navigate = useNavigate();

  // Function to extract original file name
  const extractOriginalFileName = (filename) => {
    const parts = filename.split("-");
    const originalNameWithExtension = parts.slice(1).join("-");
    return originalNameWithExtension.replace(".pdf", "").trim();
  };

  // Function to fetch PDF data
  const fetchPdf = async (pdfUrl) => {
    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error("Failed to fetch PDF");
      const arrayBuffer = await response.arrayBuffer();
      return new Uint8Array(arrayBuffer);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  // Fetch user PDFs on component mount
  useEffect(() => {
    const fetchUserPdfs = async () => {
      try {
        const response = await commonRequest("GET", "/user-pdfs", {
          withCredentials: true,
        });
        setPdfs(response.data);
      } catch (err) {
        setError("Failed to load PDFs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPdfs();
  }, []);

  // Initialize WebViewer when a PDF is selected
  useEffect(() => {
    if (selectedPdf && viewerRef.current) {
      WebViewer(
        {
          path: "/lib",
          initialDoc: `${URL}/${selectedPdf}`,
        },
        viewerRef.current
      ).then((instance) => {
        setInstance(instance);

        instance.Core.documentViewer.addEventListener("documentLoaded", () => {
          const doc = instance.Core.documentViewer.getDocument();
          if (doc) {
            setPageCount(doc.getPageCount());
          }
        });
      });
    }
  }, [selectedPdf]);

  // Handle view PDF action
  const handleView = (pdf) => {
    setSelectedPdf(pdf.path);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setSelectedPdf(null);
    setSelectedPages([]);
  };

  // Handle edit PDF action
  const handleEdit = (pdf) => {
    setSelectedPdf(pdf.path);
    setSelectedPages([]);
  };

  // Handle delete PDF action
  const handleDelete = async (pdf) => {
    // Implement delete functionality here
  };

  // Toggle page selection
  const togglePageSelection = (pageNumber) => {
    setSelectedPages((prev) =>
      prev.includes(pageNumber)
        ? prev.filter((page) => page !== pageNumber)
        : [...prev, pageNumber]
    );
  };

const downloadSelectedPages = async () => {
  if (!instance) {
    console.error("WebViewer instance is not available.");
    return;
  }

  const docViewer = instance.Core.documentViewer;
  const doc = docViewer.getDocument();

  if (!doc) {
    console.error("Document is not available.");
    return;
  }

  try {
    const pdfData = await doc.getFileData({ downloadType: "pdf" });
    const pdfBytes = new Uint8Array(pdfData);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const newPdfDoc = await PDFDocument.create();

    for (const pageNumber of selectedPages) {
      const [page] = await newPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
      newPdfDoc.addPage(page);
    }

    const pdfBytesNew = await newPdfDoc.save();
    const blob = new Blob([pdfBytesNew], { type: "application/pdf" });

    // Fallback using FileReader if URL.createObjectURL is unavailable
    const reader = new FileReader();
    reader.onloadend = function () {
      const downloadLink = document.createElement("a");
      downloadLink.href = reader.result;
      downloadLink.download = "extracted-pages.pdf";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    reader.readAsDataURL(blob);
  } catch (error) {
    console.error("Error extracting or exporting PDF:", error);
    setError("Failed to download selected pages. Please try again.");
  }
};



  // Render page selection checkboxes
  const renderPageSelection = () => {
    if (pageCount === 0) return null;

    
    return (
      <Box style={{ marginTop: "16px" }}>
        <Typography variant="h6">Select Pages:</Typography>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {Array.from({ length: pageCount }, (_, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={selectedPages.includes(index + 1)}
                onChange={() => togglePageSelection(index + 1)}
              />
              <Typography style={{ marginLeft: "8px" }}>
                Page {index + 1}
              </Typography>
            </div>
          ))}
        </div>
      </Box>
    );
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 2 }}>
      <Box
        className="flex items-center mb-4 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft size={24} className="text-blue-500 mr-2" />
        <Typography variant="h6" className="text-blue-500">
          Back
        </Typography>
      </Box>

      <Typography variant="h4" gutterBottom>
        My Uploaded PDFs
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center">
          <Spinner />
        </Box>
      )}
      {error && <Typography color="error">{error}</Typography>}
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Table aria-label="Uploaded PDFs Table" striped>
          <TableHeader>
            <TableColumn>PDF Name</TableColumn>
            <TableColumn align="center">Actions</TableColumn>
          </TableHeader>
          <TableBody items={pdfs}>
            {(item) => (
              <TableRow key={item._id}>
                <TableCell>{extractOriginalFileName(item.filename)}</TableCell>
                <TableCell>
                  <Box display="flex" gap={2} justifyContent="center">
                    <Tooltip content="View PDF">
                      <div>
                        <EyeIcon onClick={() => handleView(item)} />
                      </div>
                    </Tooltip>
                    <Tooltip content="Edit PDF">
                      <div>
                        <EditIcon onClick={() => handleEdit(item)} />
                      </div>
                    </Tooltip>
                    <Tooltip content="Delete PDF">
                      <div>
                        <DeleteIcon onClick={() => handleDelete(item)} />
                      </div>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {selectedPdf && (
          <Box>
            <Box
              className="webviewer"
              ref={viewerRef}
              sx={{ height: 600, marginTop: 2 }}
            ></Box>

            {/* Page selection */}
            {renderPageSelection()}

            {/* Button container */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: "green", // Normal color
                  color: "white", // Text color
                  marginTop: 16, // Margin in pixels
                }}
                onClick={downloadSelectedPages}
              >
                Download Selected Pages
              </Button>
              <Button
                variant="outlined"
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginTop: 16,
                }}
                onClick={handleCloseModal}
              >
                Close
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default UserPdfsPage;
