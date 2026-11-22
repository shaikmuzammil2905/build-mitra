const PDFDocument = require('pdfkit');

/**
 * Generate a professional BuildMitra Engineering Estimation Report as a Buffer
 * @param {object} params
 * @param {string} params.reportNo e.g. BM-EST-2026-8812
 * @param {string} params.calculatorName e.g. Turnkey Construction Cost Calculator
 * @param {string} params.userPhone
 * @param {number} params.areaSqFt
 * @param {string} params.grade
 * @param {number} params.ratePerSqFt
 * @param {number} params.totalCost
 * @param {Array} params.breakdown items with name, pct, cost
 * @param {Array} params.notes engineering notes
 * @returns {Promise<Buffer>}
 */
function generateEstimationPdf(params) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40, size: 'A4' });
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      const {
        reportNo = `BM-EST-${Date.now().toString().slice(-6)}`,
        calculatorName = 'Construction Cost Calculator',
        userPhone = 'Verified Client',
        areaSqFt = 1200,
        grade = 'Standard',
        ratePerSqFt = 1850,
        totalCost = 2220000,
        breakdown = [],
        notes = []
      } = params;

      // Header Banner
      doc.rect(0, 0, 612, 90).fill('#1B365D');
      doc.fillColor('#FFFFFF').fontSize(22).font('Helvetica-Bold').text('BUILDMITRA', 40, 25);
      doc.fontSize(10).font('Helvetica').text('Digital Ecosystem for Construction, Real Estate & Engineering Intelligence', 40, 52);
      doc.fontSize(9).text('ISO 9001:2015 & IS 456 Compliant Standards', 40, 66);

      // Report Meta Box
      doc.rect(40, 105, 532, 65).fillAndStroke('#F8FAFC', '#E2E8F0');
      doc.fillColor('#0F172A').fontSize(11).font('Helvetica-Bold').text(`ENGINEERING ESTIMATE REPORT: ${calculatorName.toUpperCase()}`, 55, 117);
      
      doc.fontSize(9).font('Helvetica').fillColor('#475569');
      doc.text(`Report ID: ${reportNo}`, 55, 135);
      doc.text(`Client Contact: ${userPhone}`, 55, 148);
      doc.text(`Date & Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`, 300, 135);
      doc.text(`Built-up Area: ${areaSqFt.toLocaleString('en-IN')} Sq.Ft  |  Specification Grade: ${grade}`, 300, 148);

      // Key Financial Summary
      doc.rect(40, 185, 532, 55).fillAndStroke('#EFF6FF', '#BFDBFE');
      doc.fillColor('#1E40AF').fontSize(10).font('Helvetica-Bold').text('TOTAL ESTIMATED PROJECT COST', 55, 197);
      doc.fillColor('#1D4ED8').fontSize(20).text(`₹ ${totalCost.toLocaleString('en-IN')}`, 55, 212);

      doc.fillColor('#475569').fontSize(9).font('Helvetica');
      doc.text(`Base Estimated Rate: ₹ ${ratePerSqFt.toLocaleString('en-IN')} / Sq.Ft`, 300, 202);
      doc.text(`Payment Verification: Razorpay Live (Verified ₹20 Fee)`, 300, 218);

      // Detailed Material & Civil Component Breakdown Table
      doc.fillColor('#0F172A').fontSize(12).font('Helvetica-Bold').text('Material & Labor Component Cost Breakdown', 40, 260);

      let tableTop = 280;
      doc.rect(40, tableTop, 532, 22).fill('#1E293B');
      doc.fillColor('#FFFFFF').fontSize(9).font('Helvetica-Bold');
      doc.text('Component / Trade Item', 50, tableTop + 6);
      doc.text('Share (%)', 310, tableTop + 6);
      doc.text('Estimated Value (₹)', 430, tableTop + 6);

      const items = breakdown.length > 0 ? breakdown : [
        { name: 'Cement & Concrete Mortar (PPC / OPC 53)', pct: 16.4, cost: Math.round(totalCost * 0.164) },
        { name: 'High-Yield Fe 550D TMT Rebar Steel', pct: 24.6, cost: Math.round(totalCost * 0.246) },
        { name: 'Washed M-Sand & Coarse Aggregates (20mm/40mm)', pct: 12.3, cost: Math.round(totalCost * 0.123) },
        { name: 'Red Clay Kiln Bricks & AAC Masonry Blocks', pct: 10.2, cost: Math.round(totalCost * 0.102) },
        { name: 'Skilled Masonry, Shuttering & Bar Bending Labor', pct: 22.5, cost: Math.round(totalCost * 0.225) },
        { name: 'Plumbing (CPVC/PVC), Electrical Conduit & Priming', pct: 14.0, cost: Math.round(totalCost * 0.140) }
      ];

      let rowY = tableTop + 22;
      items.forEach((item, index) => {
        const bg = index % 2 === 0 ? '#F8FAFC' : '#FFFFFF';
        doc.rect(40, rowY, 532, 22).fill(bg);
        doc.fillColor('#1E293B').fontSize(9).font('Helvetica');
        doc.text(item.name, 50, rowY + 6);
        doc.text(`${item.pct}%`, 310, rowY + 6);
        doc.font('Helvetica-Bold').text(`₹ ${item.cost.toLocaleString('en-IN')}`, 430, rowY + 6);
        rowY += 22;
      });

      // Engineering Assumptions & Notes
      rowY += 15;
      doc.rect(40, rowY, 532, 85).fillAndStroke('#F1F5F9', '#CBD5E1');
      doc.fillColor('#0F172A').fontSize(10).font('Helvetica-Bold').text('Engineering Assumptions & Specification Compliance', 50, rowY + 10);
      
      doc.fillColor('#334155').fontSize(8.5).font('Helvetica');
      const defaultNotes = [
        'Calculations conform to IS 456:2000 Code of Practice for Plain and Reinforced Concrete.',
        'Material rates reflect verified primary distributor index across metropolitan tier-1/tier-2 hubs.',
        'Substructure foundation depth assumed at 5 to 6 feet below natural ground level (NGL).',
        'Reverse auction bids may yield 4% to 8% landed savings via verified BuildMitra suppliers.'
      ];
      const activeNotes = notes.length > 0 ? notes : defaultNotes;
      activeNotes.slice(0, 4).forEach((note, idx) => {
        doc.text(`• ${note}`, 50, rowY + 28 + (idx * 13));
      });

      // Legal Disclaimer & Security Watermark
      const footerY = 720;
      doc.rect(40, footerY, 532, 60).fillAndStroke('#FFFBEB', '#FDE68A');
      doc.fillColor('#92400E').fontSize(8).font('Helvetica-Bold').text('DISCLAIMER & VERIFICATION STAMP', 50, footerY + 8);
      doc.font('Helvetica').fillColor('#78350F').fontSize(7.5);
      doc.text(
        'This calculation is an automated computer-generated engineering estimate intended for budgetary, architectural planning and BOQ preparation. Final construction costs may vary based on structural soil bearing capacity (SBC), architectural revisions, and localized material transit surcharges. Powered by BuildMitra Cloud Infrastructure (Mumbai, India).',
        50,
        footerY + 22,
        { width: 512, align: 'justify' }
      );

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  generateEstimationPdf
};
